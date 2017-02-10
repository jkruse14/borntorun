angular
    .module('onDemandRaces')
    .value('coursesSchema',{
        host_id:{id:"course-host-id", type:"hidden"},
        event_id:{id:"course-event-id", type:"hidden"},
        gps_data:{id:"course-gps-data", type:"text", label: "GPS Data"},
        gps_file:{id:"course-gps-file", type:"file", label: "GPS File"}
    })