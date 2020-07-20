const proxy = require("../../../lib/server-remote-proxy");
const Service = proxy.getService();

const handler = async (req, res) => {
  const svc = await Service.lookup("CloudPaymentService", "epayment");
  const data = { ...req.body };
	data.paypartnerid = 'DBP'; 
	data.paymentrefid = m.referenceCode; 

	const pmt = await svc.postPayment(data);
	pmt.orgcode = pmt.info.orgcode;
	pmt.particulars = pmt.info.particulars;
	pmt.paypartnercode = pmt.paypartnerid;
  const args = '?orgcode='+ pmt.orgcode +'&paymentrefid='+ data.paymentrefid; 
  res.redirect(`/payoptions/success?${args}`);
}

module.exports = handler