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
  const { name: methodName, action, connection } = service;
  try {
    const svc = await serviceMgr.getService(methodName, action, connection);
    const data = await svc.invoke(args);
    res.send(data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
})


router.get("/service/test", (req, res) => {
  res.send({status: "OK"});
})

module.exports = router;
