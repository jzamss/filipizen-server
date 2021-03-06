export * from "rptis-web";
export * from "bpls-web";
export * from "obo-web";
export * from "waterworks-web";
export * from "aklan-web";


// Module and Server registration 
const modules = [
  { 
    name: "bpls", 
    title: "Business",
    services: [
      { name: 'businessbilling', title: "Business Online Billing", component: "BplsBillingWebController" },
      { name: 'newbusiness', title: "Apply New Business", component: "NewBusinessWebController" },
    ]
  },
  { 
    name: "rpt", 
    title: "Real Property",
    services: [
      { name: 'rptbilling', title: "Realty Tax Online Billing", component: "RptBillingWebController" },
      { name: 'rpttaxclearance', title: "Online Realty Tax Clearance", component: "RealtyTaxClearanceWebController" },
    ]
  },
  { 
    name: "obo", 
    title: "Building and Construction",
    services: [
      { name: 'bldgpermit', title: "Building Permit Application", component: "BuildingPermitWebController" },
      { name: 'occupancypermit', title: "Occupancy Permit Application", component: "OccupancyPermitWebController" },
      { name: 'registerprofessionals', title: "Register Professional", component: "ProfessionalWebController" },
      { name: 'apptracking', title: "Application Tracking", component: "AppTrackingWebController" },
      { name: 'obobilling', title: "Building Permit Online Billing", component: "OboBillingWebController" },
    ]
  },
  { 
    name: "waterworks", 
    title: "Waterworks",
    services: [
      { name: 'waterworksbilling', title: "Waterworks Billing", component: "WaterworksBillingWebController" },
    ]
  },
  { 
    name: "boracay", 
    title: "Boracay",
    services: [
      { name: 'terminalticket', title: "Terminal Tickets", component: "TerminalTicketWebController" },
    ]
  },
];

export const getModules = (partner) => {
  const pattern = partner.includeservices || ".*";
  const regex = new RegExp(`(${pattern})`, "i");
  const partnerModules = [...modules];
  partnerModules.forEach(module => {
    const parterServices = module.services.filter(service => regex.test(service.name));
    module.services = parterServices;
  });
  return partnerModules;
}


