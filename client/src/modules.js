export * from "rptis-web";
export * from "bpls-web";
export * from "obo-web";


//TODO: get from server 
export const getPartners = () => {
  return [
    {
      objid: "test",
      name: "Test",
      orgcode: "000",
      citymunicipality: "MUNICIPALITY",
      province: "PROVINCE",
      modules: [
        {
          name: "bpls",
          title: "Business",
          services: [
            {
              module: "bpls",
              name: "bpbilling",
              title: "Business Online Billing",
              lib: "bpls-web",
              component: "BplsBillingWebController",
            },
            {
              module: "bpls",
              name: "newbusiness",
              title: "Apply New Business",
            },
          ],
        },
        {
          name: "rpt",
          title: "Real Property",
          services: [
            {
              module: "rpt",
              name: "rptbilling",
              title: "Realty Tax Online Billing",
              lib: "rptis-web",
              component: "RptBillingWebController",
            },
          ],
        },
        {
          name: "obo",
          title: "Building and Construction",
          services: [
            {
              module: "obo",
              name: "permit",
              title: "Building Permit Application",
              lib: "obo-web",
              component: "BuildingPermitWebController",
            },
            {
              module: "obo",
              name: "occupancy",
              title: "Occupancy Permit Application",
              lib: "obo-web",
              component: "OccupancyPermitWebController",
            },
            {
              module: "obo",
              name: "professionals",
              title: "Register Professionals",
              lib: "obo-web",
              component: "ProfessionalWebController",
            },
          ],
        },
      ],
    },

    {
      objid: "legazpi",
      name: "legazpi",
      orgcode: "137",
      citymunicipality: "",
      province: "ALBAY",
      modules: [
        {
          name: "bpls",
          title: "Business",
          services: [
            {
              module: "bpls",
              name: "bpbilling",
              title: "Business Online Billing",
              lib: "bpls-web",
              component: "BplsBillingWebController",
            },
            {
              module: "bpls",
              name: "newbusiness",
              title: "Apply New Business",
            },
          ],
        },
        {
          name: "rpt",
          title: "Real Property",
          services: [
            {
              module: "rpt",
              name: "rptbilling",
              title: "Realty Tax Online Billing",
              lib: "rptis-web",
              component: "RptBillingWebController",
            },
          ],
        },
        {
          name: "obo",
          title: "Building and Construction",
          services: [
            {
              module: "obo",
              name: "permit",
              title: "Building Permit Application",
              lib: "obo-web",
              component: "BuildingPermitWebController",
            },
            {
              module: "obo",
              name: "occupancy",
              title: "Occupancy Permit Application",
              lib: "obo-web",
              component: "OccupancyPermitWebController",
            },
            {
              module: "obo",
              name: "professionals",
              title: "Register Professionals",
              lib: "obo-web",
              component: "ProfessionalWebController",
            },
          ],
        },
      ],
    },
  ];
};
