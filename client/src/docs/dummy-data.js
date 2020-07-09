export const PARTNERS = [
  {
    objid: "aklanprov", 
    name: "Aklan",
    lgus: [
      { objid: "aklan", name: "Aklan Province (038)", active: true },
      { objid: "kalibo", name: "Kalibo (03801)" },
      { objid: "altavas", name: "Altavas (03802)" },
      { objid: "malay", name: "Malay (03812)" },
    ],
  },
  {
    objid: "albay", 
    name: "Albay",
    lgus: [
      { objid: "legazpi", name: "Legazpi City (137)" },
      { objid: "ligao", name: "Ligao City (207)" },
    ],
  },
];

export const PARTNER_SERVICES = [
  {
    objid: "aklan",
    name: "Aklan",
    modules: [
      {
        name: "bpls",
        title: "Business",
        services: [
          {module: 'bpls', name: "bpbilling", title: "Business Online Billing", lib: 'bpls-web', component: "OnlineBillingWebController"  },
          {module: 'bpls', name: "newbusiness", title: "Apply New Business" },
        ],
      },
      {
        name: "rpt",
        title: "Real Property",
        services: [
          {module: 'rpt', name: "rptbilling", title: "Realty Tax Online Billing", component: "OnlineBilling"   },
          {module: 'rpt', name: "rpttaxclearance", title: "Request Tax Clearance" },
        ],
      },
    ],
  },
  {
    objid: "kalibo",
    name: "Kalibo",
    modules: [
      {
        module: "business",
        title: "Business",
        services: [
          {module: 'bpls', name: "bpbilling", title: "Business Online Billing", component: "OnlineBilling" },
          {module: 'bpls', name: "newbusiness", title: "Apply New Business" },
        ],
      },
      {
        module: "rpt",
        title: "Real Property",
        services: [
          {module: 'rpt', name: "rptbilling", title: "Realty Tax Online Billing" },
          {module: 'rpt', name: "rpttaxclearance", caption: "Request Tax Clearance" },
        ],
      },
    ],
  },
];
