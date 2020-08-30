export * from "rptis-web";
export * from "bpls-web";
export * from "obo-web";


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
    ]
  },
  { 
    name: "obo", 
    title: "Building and Construction",
    services: [
      { name: 'bldgpermit', title: "Building Permit Application", component: "BuildingPermitWebController" },
      { name: 'occupancypermit', title: "Occupancy Permit Application", component: "OccupancyPermitWebController" },
      { name: 'registerprofessionals', title: "Register Professionals", component: "ProfessionalWebController" },
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


