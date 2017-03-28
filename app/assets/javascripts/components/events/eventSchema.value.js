angular
    .module('onDemandRaces')
    .factory("eventSchema",[ 'fileUtils', function(fileUtils) {
        var self = this;
        self.fileUtils = fileUtils;
        return {
            host : {id:"event-host", type:"text", label:"Event Host"},
            course: {id:"event-course", type:"text", label:"Event Course"},
            title: {id:"event-title", type:"text", label:"Event Title"},
            distance:{id: "event-distance", type:"number", label:"Event Distance"},
            eventType:{id:"event-type", type:"text", label:"Event Type", options:{xc:"Cross Country", trail:"Trail", road:"Road", track:"Track", other:"Other"}},
            city:{id:"event-city",type:"text", label:"City"},
            state:{id:"event-state", type:"text", label:"State"},
            country:{id:"event-country", type:"text", label:"Country"},
            entry_fee:{id:"event-entryFee", type:"number", label:"Entry Fee"},
            description:{id:"event-description", type:"text", label:"Description"},
            gps_file:{id:"event-gps-file", type:"file", label:"Upload GPS File", hasChangeAction: true, changeAction:self.fileUtils.loadFile}
        }
    }]);