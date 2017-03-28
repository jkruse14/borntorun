angular
    .module("onDemandRaces")
    .factory("distanceUtils", [function(){
        var self = this;
        self.attributes = {
            //one degree in meters
            ONE_DEGREE : 1000.0 * 10000.8 / 90.0,
            INTERPOLATE_MAX_DISTANCE : 20,
            START_AREA_ERROR_MARGIN : 60, //must be w/in x meters
        };

        self.toRadians = function (degInp) {
            return degInp / 180. * Math.PI;
        };

        self.toDegrees = function (radInp) {
            return radInp * 180 / Math.PI;
        };

        /**
        * implemented from http://www.movable-type.co.uk/scripts/latlong.html
        *
        * the ‘haversine’ formula to calculate the great-circle distance between 
        * two points – that is, the shortest distance over the earth’s surface – 
        * giving an ‘as-the-crow-flies’ distance between the points (ignoring any 
        * hills they fly over)
        */
        self.haversineDistance = function(deg_lat1, deg_lng1, deg_lat2, deg_lng2){
            var R = 6371000; // Earth's mean radius in meters
            var rad_lat1 = self.toRadians(deg_lat1);
            var rad_lat2 = self.toRadians(deg_lat2);
            var delta_rad_lat = self.toRadians((deg_lat2-deg_lat1));
            var delta_rad_lng = self.toRadians((deg_lng2-deg_lng1));

            //a is the square of half the chord length between the points
            var a = Math.sin(delta_rad_lat/2) * Math.sin(delta_rad_lat/2) +
                    Math.cos(rad_lat1) * Math.cos(rad_lat2) *
                    Math.sin(delta_rad_lng/2) * Math.sin(delta_rad_lng/2);
            // c is the angular distance in radians
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

            var d = R * c;

            return d;
        };

        /*
        *  Haversine distance will be used for distant points where elevation makes a
        * small difference, so it is ignored. That's because haversine is 5-6 times
        * slower than the dummy distance algorithm (which is OK for most GPS tracks).
        */
        self.calculateDistance = function(latitude_1, longitude_1, elevation_1, latitude_2, longitude_2, elevation_2) {
        

            //If points are too distant -- compute haversine distance:
            if (Math.abs(latitude_1 - latitude_2) > .2 || Math.abs(longitude_1 - longitude_2) > .2){
                return self.haversineDistance(latitude_1, longitude_1, latitude_2, longitude_2);
            }

            var coef = Math.cos(latitude_1 / 180.0 * Math.PI);
            var x = latitude_1 - latitude_2;
            var y = (longitude_1 - longitude_2) * coef;

            var distance_2d = Math.sqrt(x * x + y * y) * self.attributes.ONE_DEGREE;

            if (elevation_1 == null || elevation_2 == null || elevation_1 == elevation_2){
                return distance_2d;
            }

            var d =  Math.sqrt(Math.pow(distance_2d,2) + Math.pow((elevation_1 - elevation_2),2));
            return d;
        };

        return self;
    }])