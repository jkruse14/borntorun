angular
    .module("onDemandRaces")
    .factory("compareCourses", ['distanceCalculator', function(distanceCalculator){
        //much of this is converted from a great python library (gpxpy) made to compare gpx data:
        //https://github.com/tkrajina/gpxpy/blob/master/gpxpy/geo.python
        var self = this;
        self.attributes = {
            //one degree in meters
            ONE_DEGREE : 1000.0 * 10000.8 / 90.0,
            INTERPOLATE_MAX_DISTANCE : 20,
            START_AREA_ERROR_MARGIN : 60, //must be w/in x meters
        };

        self.toRadians = function(degInp) {
            return degInp  / 180. * Math.PI;
        };

        self.toDegrees = function(radInp) {
            return radInp*180/Math.PI;
        };

        /*
        * Calculates the initial bearing between point1 and point2 relative to north
        * (zero degrees).
        */
        self.bearing = function(point1, point2) {
            var lat1r = this.toRadians(point1[0]);
            var lat2r = this.toRadians(point2[0]);
            var dlon = this.toRadians(point2[1] - point1[1]);

            var y = Math.sin(dlon) * Math.cos(lat2r);
            var x = Math.cos(lat1r) * Math.sin(lat2r) - Math.sin(lat1r) * Math.cos(lat2r) * Math.cos(dlon);
            
            return this.toDegrees(Math.atan2(y, x));
        };

        self.moveCoordByAngleAndDistance = function(coord, mvDist, mvAngle){
            var coef = Math.cos(coord[0]/ 180.0 * Math.PI);
            var vertical_distance_diff   = Math.sin((90 - mvAngle) / 180 * Math.PI) / this.attributes.ONE_DEGREE;
            var horizontal_distance_diff = Math.cos((90 - mvAngle) / 180 * Math.PI) / this.attributes.ONE_DEGREE;
            var lat_diff = mvDist * vertical_distance_diff;
            var lng_diff = mvDist * horizontal_distance_diff / coef;
            lat_diff = Math.round(lat_diff*1000000)/1000000;
            lng_diff = Math.round(lng_diff*1000000)/1000000;

            return [lat_diff, lng_diff];
        };

        /**
        * Interpolates points so that the distance between each point is equal
        * to `distance` in meters.
        * Only latitude and longitude are interpolated; time and elavation are not
        * interpolated and should not be relied upon
        */
        self.interpolateDistance = function(points) {
            //TODO: interpolate time and elevation
            var d = 0;
            var i = 0;
            var totalDistance = 0;
            var even_points = [];
            var p1, p2;
            var count = 0;
            while( i < points.length){
                if(i == 0) {
                    even_points.push(points[0]);
                    i += 1;
                    continue;
                }

                if (d == 0 && i >= 1){
                    p1 = even_points[even_points.length-1];;
                } else if(d == 0) {
                    p1 = even_points[even_points.length-1];//even_points[-1];
                } else {
                    p1 = points[i-1];
                }

                p2 = points[i];

                d += distanceCalculator.calculateDistance(p1[0], p1[1], 0,//p1.elevation,
                                        p2[0], p2[1],0);// p2.elevation);

                if(d >= this.attributes.INTERPOLATE_MAX_DISTANCE){
                    var brng = this.bearing(p1, p2);
                    var p2_copy = JSON.parse(JSON.stringify(p2)); //create a deep copy (there are no functions, only an array so this will work)
                    var locDelta = this.moveCoordByAngleAndDistance(p1, -(d-this.attributes.INTERPOLATE_MAX_DISTANCE), brng);
                    p2_copy[0] += locDelta[0];
                    p2_copy[1] += locDelta[1];
                    
                    even_points.push(p2_copy);
                    d = 0;
                    totalDistance += distanceCalculator.calculateDistance(p1[0], p1[1], 0,//p1.elevation,
                                        p2_copy[0], p2_copy[1],0);// p2.elevation);;
                } else {
                    totalDistance += Math.abs(d);
                    even_points.push(p1);
                    i += 1;
                }
                

                //TODO: remove later when this is 100% working and nothing will run away
                count += 1;
                if(count > 50000)
                    break;
            }
            even_points.push(points[points.length - 1]);
            return {points:even_points, totalDistance:totalDistance};
        };

        self.createFMatrix = function(xdim, ydim){
            var matrix = [];
            for(var i = 0; i < xdim; i++){
                var inner = [];
                for(var j = 0; j < ydim; j++){
                    inner.push(0);
                }
                matrix.push(inner);
            }

            return matrix;
        };

        self.doComparison = function(route1, route2, gap_penalty) {
            gap_penalty = -80;
            var courseStart = route1[0];
            var runnerStart = route2[0];
            if(Math.abs(distanceCalculator.calculateDistance(courseStart[0],courseStart[1],0,runnerStart[0],runnerStart[1],0)) > this.attributes.START_AREA_ERROR_MARGIN){
                //console.log("Starting positions do not match")
                //console.log("course: "+courseStart[0]+", "+courseStart[1]);
                //console.log("runner: "+runnerStart[0]+", "+runnerStart[1]);
                var startDiff = distanceCalculator.calculateDistance(courseStart[0],courseStart[1],0,runnerStart[0],runnerStart[1],0);
                return {error:"You were too far from the starting area. You were " +startDiff.toFixed(2)+" meters away and must be within "+this.attributes.START_AREA_ERROR_MARGIN+" meters.", total_similar: 0};
            } else {
                //route2[0] = route1[0];
                var route2start = this.interpolateDistance([route2[0],route1[0]]).points;
                route2.shift();
                for(var elt = route2start.length - 1; elt >= 0; elt--){
                    route2.unshift(route2start[elt]);
                }
            }
            // construct f-matrix
            var f = this.createFMatrix(route1.length, route2.length);
            for(var i = 0; i < route1.length; i++){
                f[i][0] = gap_penalty * i;
            }
            for(var j = 0; j < route2.length; j++){
                f[0][j] = gap_penalty * j;
            }
            for (var i = 1; i < route1.length; i++){
                var t1 = route1[i];
                for(var j = 1; j < route2.length; j++){
                    var t2 = route2[j];
                    var match = f[i-1][j-1] + (distanceCalculator.calculateDistance(t1[0],t1[1],0, t2[0],t2[1],0) * -1);
                    var del = f[i-1][j] + gap_penalty;
                    var insert = f[i][j-1] + gap_penalty;
                    f[i][j] = Math.max(match, del, insert);
                }
            }
            f[0][0] = 0;

            // backtrack to create alignment
            var a1 = [];
            var a2 = [];
            var i = route1.length - 1;
            var j = route2.length - 1;
            var count = 0;
            var matchCount = 0, upCount = 0, leftCount = 0, skippedCount = 0;
            var diffsSum = 0;
            var diffsCount = 0;
            while(i > 0 || j > 0) {
                //if route 1 has more coords than 2 and current points do not match, incrememt route 1 only
                //keep track of distance, increment route 2 when route 1 starts to diverge from route two
                var similarity = (distanceCalculator.calculateDistance(route1[i][0],route1[i][1],0, route2[j][0],route2[j][1],0) * -1);

                if(route1.length > route2.length || route2.length > route1.length) {
                    var route1Longer = route1.length > route2.length;

                    var nextDist = null;
                    if (route1Longer && i > 0) {
                        nextDist = (distanceCalculator.calculateDistance(route1[i-1][0],route1[i-1][1],0, route2[j][0],route2[j][1],0) * -1);	
                    } else if(!route1Longer && j > 0){
                        nextDist = (distanceCalculator.calculateDistance(route1[i][0],route1[i][1],0, route2[j-1][0],route2[j-1][1],0) * -1);
                    }
                    if(nextDist != null && nextDist < similarity) {
                        if(route1Longer)
                            i -= 1;
                        else
                            j -= 1;

                        skippedCount += 1;
                        continue;
                    } else {
                        diffsSum += Math.abs(similarity);
                        diffsCount += 1;
                    }
                }

                if(i > 0 && j > 0 && (f[i][j] == f[i-1][j-1] + similarity || similarity >= gap_penalty)) {
                    a1.unshift(route1[i]);
                    a2.unshift(route2[j]);
                    i -= 1;
                    j -= 1;
                    matchCount += 1;
                } else if(i > 0 && f[i][j] == f[i-1][j] + gap_penalty){
                    a1.unshift(route1[i]);
                    a2.unshift(null);
                    i -= 1;
                    upCount += 1;
                }else if( j > 0 && f[i][j] == f[i][j-1] + gap_penalty){
                    a1.unshift(null);
                    a2.unshift(route2[j]);
                    j -= 1;
                    leftCount+=1;
                } 

                count += 1;
                if(count > 50000){
                    break;
                }
            }

            // Output the difference in the tracks as a percentage
            var match = 0;
            for (var i = 0; i < a1.length; i++){
                if (a1[i] != null && a2[i] != null)
                    match += 1;
            }

        //console.log("gap_penalty: "+gap_penalty);
        //console.log("skippedCount: ",skippedCount);
        var total_similar = (match / (a1.length-skippedCount))*100;
        var route2InCourse = match/route2.length * 100;
        console.log("Track Similarity: "+total_similar+"%");
        console.log("route2InCourse: ",route2InCourse);
        console.log("match: ", match);
        console.log("matchCount: ", matchCount);
        //console.log("a2 len: ",a2.length);
        var averageGap = diffsSum/(diffsCount);
        console.log("average: ",averageGap);
            return {error:null, total_similar: total_similar, userCoordsInCoursePercent: route2InCourse, averageGap:averageGap};
        
        }
    return self;
}]);