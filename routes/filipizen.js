const serviceMgr = require("../lib/service-manager");

const express = require("express");
const router = express.Router();

router.get("/service/metainfo", async (req, res) => {
  try {
    const { serviceName, connection } = req.query;
    const meta = await serviceMgr.getServiceMeta(serviceName, connection);
    res.send(meta);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

router.post("/service/invoke", async (req, res) => {
  const { service, args } = req.body;
  const { name: serviceName, action, connection } = service;
  try {
    const svc = await serviceMgr.getService(serviceName, action, connection);
    const data = await svc.invoke(args);
    res.send(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
})


const postPartnerPayment = async (params) => {
  const svc = await serviceMgr.getService("CloudPaymentService", "postPartnerPayment", "epayment");
  return await svc.invoke([params]);
}


let partnerError = "Our partner was not able to process your payment."
partnerError += "Kindly verify that your credentials are correct upon submitting your payment.";

router.get("/payoptions/:statusid", async (req, res) => {
  const statusid = req.params.statusid;
  
  if (/error/i.test(statusid)) {
    let error = ""
    res.redirect(`/payment/error?msg=${partnerError}`);
  } else {
    try {
      const params = {statusid , ...req.body, ...req.query}
      const pmt = await postPartnerPayment(params);
      const args = buildArgs(pmt);
      res.redirect(`/payment/success?${args}`);
    } catch (err) {
      res.redirect(`/payment/error?msg=${err.toString()}`);
    }
  }
})

router.post("/payoptions/:statusid", async (req, res) => {
  const statusid = req.params.statusid;
  if (/error/i.test(statusid)) {
    res.redirect(`/payment/error?msg=${partnerError}`);
  } else {
    try {
      const params = {statusid , ...req.body}
      const pmt = await postPartnerPayment(params);
      const args = buildArgs(pmt);
      res.redirect(`/payment/success?${args}`);
    } catch (err) {
      res.redirect(`/payment/error?msg=${err.toString()}`);
    }
  }
})

const buildArgs = (pmt) => {
  const data = {
    orgcode: pmt.orgcode,
    txnno: pmt.paymentrefid,
    txndate: pmt.txndate,
    amount: Number(pmt.amount),
    paypartnerid: pmt.paypartnerid.toLowerCase(),
    paidby: pmt.paidby,
    email: pmt.email,
  }
  const args = [];
  Object.keys(data).forEach(key =>
    args.push(`${key}=${encodeURIComponent(data[key])}`)
  );
  return args.join("&")
}



module.exports = router;
