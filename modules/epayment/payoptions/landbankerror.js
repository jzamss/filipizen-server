const util = require("../../../lib/util");
const proxy = require("../../../lib/server-remote-proxy");
const Service = proxy.getService();

const handler = async (req, res) => {
  const REQPARAMS = req.params
  const svc = await Service.lookup("CloudPaymentService", "epayment");
  const po = svc.getPaymentOrder({ refno: REQPARAMS.MerchantRefNo });
  const svc = await Service.lookup("CloudPartnerService", "partner");
	const agency = partnerSvc.findById({ id: po?.orgcode.toString() });

  const param = {}
	param.paymentrefid = REQPARAMS.MerchantRefNo; 
	param.message = (REQPARAMS.message ? REQPARAMS.message : '');
	param.paymentpartnercode = 'LBP'; 
	param.orgcode =  po?.orgcode; 
	param.agencylink =  agency?.group?.name +'_' + agency?.name;
	param.agencytitle =  agency?.title +', '+ agency?.group?.title; 

	if( REQPARAMS.Status ) param.errcode = REQPARAMS.Status;
  else if ( REQPARAMS.status ) param.errcode = REQPARAMS.status; 
  
  const args = util.encodeQueryParams(params);
  res.redirect(`/payoptions/error?${args}`);
}

module.exports = handler