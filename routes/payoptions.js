// const proxy = require("../lib/remote-proxy");
const express = require("express");
const router = express.Router();

// const Service = proxy.getService();

const encodeQueryParams = params => {
  let str = "";
  Object.keys(params).forEach(key => {
    str += `${key}=${encodeURIComponent(params[key])}`;
  })
  return str;
}

router.post("/landbanksuccess", async (req, res) => {
  console.log("QUERY", req.query);
  console.log("PARAMS", req.params);
  console.log("BODY", req.body);

	// const svc = Service.lookup("CloudPaymentService", "epayment");
  // const data = {...req.body};
  // data.paypartnerid = 'LBP'; 
	// data.paymentrefid = data.MerchantRefNo; 

	// const pmt = svc.postPayment(data);
	// pmt.orgcode = pmt.info.orgcode;
	// pmt.particulars = pmt.info.particulars;
	// pmt.paypartnercode = pmt.paypartnerid;
  // const args = encodeQueryParams({orgcode: pmt.orgcode, paymentrefid: data.paymentrefid});
	// console.log("args ->", args);
  // res.redirect(`/payoptions/success?${args}`);
  res.redirect(`/payoptions/success`);
});

module.exports = router;

