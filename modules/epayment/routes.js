// /epayment/** = epayment:/**
// /payoptions/**	= epayment:/payoptions/**	
// /postpayment = epayment:/postpayment
// /partners/[name]/services/epayment/** = epayment:/**

const routes = [
  {route: "/payoptions", path: "epayment:/payoptions"},
]

module.exports = routes;