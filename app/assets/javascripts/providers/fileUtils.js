angular
    .module('onDemandRaces')
    .factory('fileUtils', ['compareCourses','gpsFileReader',function(compareCourses,gpsFileReader){
        var self = this;
        self.file = null;

        self.loadFile = function(e) {
            if(e != undefined) {
                var file = e.target.files[0];
            
                if(file != null && file.size > 0) {
                    self.file = file;
                }
                return file;
            }
       }

       self.processGPXFile = function(file,course) {
            return new Promise(function(resolve,reject){
            var data = {};
                var freader = new FileReader();
                
                freader.onload = function(revent) {
                    var parser = new DOMParser();
                    var xmlObj =  parser.parseFromString(freader.result, "text/xml");

                    data = gpsFileReader.processGPXData(xmlObj, false);
                    var interpolated = compareCourses.interpolateDistance(data.coords);
                    data.coords = interpolated.points;
                    data.userRoute = false;
                    data.course = course;
                    
                    //post to DB? or just the GeoJSON?
                    if(data.hasOwnProperty("name")) {
                        resolve(data);
                    } else {
                        reject(Error("No data found"));
                    }
                }

                freader.onerror = function() {
                //console.log("onerror");
                }

                freader.readAsText(file);
            });
        }

       return self;
    }]);