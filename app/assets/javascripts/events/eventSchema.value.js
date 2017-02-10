angular
    .module('onDemandRaces')
    .value("eventSchema", {
        host : {id:"event-host", type:"text", label:"Event Host"},
        course: {id:"event-course", type:"text", label:"Event Course"},
        title: {id:"event-title", type:"text", label:"Event Title"},
        distance:{id: "event-distance", type:"number", label:"Event Distance"},
        type:{id:"event-type", type:"text", label:"Event Type", options:{xc:"Cross Country", trail:"Trail", road:"Road", track:"Track", other:"Other"}},
        city:{id:"event-city",type:"text", label:"City"},
        state:{id:"event-state", type:"text", label:"State"},
        country:{id:"event-country", type:"text", label:"Country"},
        entryFee:{id:"event-entryFee", type:"text", label:"Entry Fee"},
        description:{id:"event-description", type:"text", label:"Description"},
    });