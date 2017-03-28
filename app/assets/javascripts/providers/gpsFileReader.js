angular
	.module("onDemandRaces")
	.factory('gpsFileReader', ['distanceUtils', function (distanceUtils) {
		var self = this;
		self.attributes = {
			//one degree in meters
			ONE_DEGREE : 1000.0 * 10000.8 / 90.0,
		},
		//want store at least 4 decimal places, up to 5 (4 should be sufficient)
		//https://en.wikipedia.org/wiki/Decimal_degrees
		//http://gis.stackexchange.com/questions/8650/how-to-measure-the-accuracy-of-latitude-and-longitude/8674#8674
		self.processGPXData = function(xmlObj, userData) {
			var data = {};
			if(xmlObj.getElementsByTagName("name")) {
				data.name = xmlObj.getElementsByTagName("name")[0].textContent;
			}
			data.coords = []; //to use with a geoJSON object
			data.elevation = [];
			data.timing = 0;
			data.addressComponents = {};
			data.distance = 0;
			data.error = null;
			var startTime = null;
			var endTime = null;
			var farthestPoint = null;
			var longestDist = 0;

			var trkpts = xmlObj.getElementsByTagName("trkpt");

			if(userData && ((!trkpts[trkpts.length - 1].getElementsByTagName("time") || !trkpts[trkpts.length - 1].getElementsByTagName("time")[0]) || (!trkpts[0].getElementsByTagName("time") || !trkpts[0].getElementsByTagName("time")[0]))) {
				data.error = "No timing data found in file";
				return data;
			} else if( userData ) {
				data.dateRun = new Date(trkpts[0].getElementsByTagName("time")[0].textContent);
				endTime = new Date(trkpts[trkpts.length - 1].getElementsByTagName("time")[0].textContent).getTime();
				data.elapsedTime = endTime - data.dateRun.getTime() //milliseconds;
				data.dateRun = data.dateRun.getTime();
			}

			var first_lat = null; Math.round(Number(trkpts[0].attributes.lat.value)*100000)/100000;
			var first_lng = null; Math.round(Number(trkpts[0].attributes.lon.value)*100000)/100000;
			
			var trkptsCopy = [];
			for(var pt in trkpts) {
				if(trkpts[pt].attributes != null && trkpts[pt].attributes.lat != null && trkpts[pt].attributes.lon != null &&
						(Number(trkpts[pt].attributes.lat.value) != 0 && Number(trkpts[pt].attributes.lon.value) != 0)) {
							trkptsCopy.push(trkpts[pt]);
				}
			}

			for(var pt in trkptsCopy) {
				var lat;
				var lng;
				
				if(trkptsCopy[pt].attributes != null && trkptsCopy[pt].attributes.lat != null && trkptsCopy[pt].attributes.lon != null &&
						(Number(trkptsCopy[pt].attributes.lat.value) != 0 && Number(trkptsCopy[pt].attributes.lon.value) != 0)) {

					if(first_lat ===  null && first_lng === null) {
						first_lat = Math.round(Number(trkptsCopy[0].attributes.lat.value)*100000)/100000;
						first_lng = Math.round(Number(trkptsCopy[0].attributes.lon.value)*100000)/100000;
					}
					lat = Math.round(Number(trkptsCopy[pt].attributes.lat.value)*100000)/100000;
					lng = Math.round(Number(trkptsCopy[pt].attributes.lon.value)*100000)/100000;
					data.coords.push([lng, lat]);
					if(trkptsCopy[pt].getElementsByTagName("ele").length) {
						data.elevation.push(Number(trkptsCopy[pt].getElementsByTagName("ele")[0].textContent));
					}
					/*if(trkpts[pt].getElementsByTagName("time").length){
						data.timing += Number(trkpts[pt].getElementsByTagName("time")[0].textContent);
					}*/
					if(pt > 1) {
						var last_lat = Math.round(Number(trkptsCopy[pt-1].attributes.lat.value)*100000)/100000;
						var last_lng = Math.round(Number(trkptsCopy[pt-1].attributes.lon.value)*100000)/100000;
						data.distance += distanceUtils.calculateDistance(last_lat, last_lng, 0, lat, lng,0);
						
						var testDist = distanceUtils.calculateDistance(Math.round(Number(first_lat, first_lng, 0,lat, lng,0)));
						if(testDist > longestDist) {
							longestDist = testDist;
							farthestPoint.lat = lat;
							farthestPoint.lng = lng;
						} 
					}
				} else {
					continue;
				}
			}

			var center = {lat:0, lng:0};
			if(farthestPoint === null) {
				center.lat = first_lat
				center.lng = first_lng;
			} else {
				center.lat = ((Math.round(Number(farthestPoint.attributes.lat.value)*100000)/100000) + first_lat)/2;
				center.lng = ((Math.round(Number(farthestPoint.attributes.lng.value)*100000)/100000) + first_lng)/2;
			}
			data.center = center;
			return data;
		};

		return self;
	}]);