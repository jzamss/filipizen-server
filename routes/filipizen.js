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

const getPaymentOrder = async (refno) => {
  const svc = await serviceMgr.getService("CloudPaymentService", "getPaymentOrder", "epayment");
  const po = await svc.invoke([{refno}]);
  return po;
}

const getPaymentPartnerOption = async ({paymentorder, payoption}) => {
  const svc = await serviceMgr.getService("CloudPaymentService", "getPaymentPartnerOption", "epayment");
  return await svc.invoke([{paymentorder, payoption}]);
}

router.post("/epayment/sendtopartner", async (req, res) => {
  try {
    const po = await getPaymentOrder(req.body.refno);
    const payoption = await getPaymentPartnerOption({paymentorder: po, payoption: req.body.payoption});

    let formaction = payoption.paypartner.info && payoption.paypartner.info.testactionurl; 
    if (payoption.paypartner && payoption.paypartner.checkout) {
      formaction = payoption.paypartner.checkout.redirectUrl;
    } 
    if ( !formaction ) {
      formaction = payoption.paypartner.actionurl;
    }

    res.redirect(formaction);
  } catch (err) {
    res.status(400).send(err.toString());
  }
  
})

module.exports = router;
