const proxy = require("../../../lib/server-remote-proxy");
const Service = proxy.getService();

const handler = async (req, res) => {
	const svc = await Service.lookup("CloudPaymentService", "epayment");
	const po = svc.getPaymentOrder({refno: req.body.referenceCode});
	const partnerSvc = await Service.lookup("CloudPartnerService", "partner");
	const agency = partnerSvc.findById({id: po.orgcode});

	const data = req.body;
	
	const params = {};
	params.paymentrefid = data.referenceCode; 
	params.message = data.message;
	params.paymentpartnercode = 'DBP'; 
	params.orgcode =  po.orgcode; 
	params.agencylink =  agency.group.name + '_' + agency.name;
	params.agencytitle =  agency.title + ', '+agency.group.title; 
	if( data.responseCode ) {
		params.errcode = data.responseCode;
	}	
	const args = util.encodeQueryParams(params);
  res.redirect(`/payoptions/error?${args}`);
}

module.exports = handler