angular
    .module('onDemandRaces')
    .value('fileLoader', function(){
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

       return self;
    });