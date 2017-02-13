angular
    .module('onDemandRaces')
    .value('hostsSchema', {
        name: {id:"host-name", type:"text", label:"Name"},
        email: {id:"host-email", type:"email", label:"Contact Email"},
        motto: {id:"host-motto", type:"text", label:"Host's Motto"},
        city: {id:"host-city", type:"text", label:"Host's City"},
        state: {id:"host-state", type:"text", label:"Host's State"},
        country: {id:"host-country", type:"text", label:"Host's Country"},
        contact_name: {id:"host-contactName", type:"text", label:"Contact Name"},
    });