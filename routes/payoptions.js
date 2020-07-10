const express = require("express");
const router = express.Router();
const proxy = require("../lib/server-remote-proxy");
const util = require("../lib/util");
const Service = proxy.getService();

router.post("/landbanksuccess", async (req, res) => {
  const data = { ...req.body };
  data.paypartnerid = "LBP";
  data.paymentrefid = data.MerchantRefNo;
  
  const svc = await Service.lookup("CloudPaymentService", "epayment");
  const pmt = await svc.postPayment(data);
  pmt.orgcode = pmt.info.orgcode;
  pmt.particulars = pmt.info.particulars;
  pmt.paypartnercode = pmt.paypartnerid;
  const args = util.encodeQueryParams({
    orgcode: pmt.orgcode,
    paymentrefid: data.paymentrefid,
  });
  res.redirect(`/payoptions/success?${args}`);
});

module.exports = router;
