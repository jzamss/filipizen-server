const path = require("path");
const express = require("express");
const router = express.Router();

const remote = require("../lib/server-remote-proxy");

const getPage = () => {
  return path.resolve("modules", "admin", "remote.html");
}

router.get("/remote", async (req, res) => {
  res.render('remote', req.data);
});

router.post("/remote/invoke", async (req, res) => {
  try {
    console.log("PARAMS", req.body)
    console.log("QUERY", req.query)
    const data = await invoke(req.body);
    res.render('remote', data);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

const invoke = async ({channel, service, method, parameters }) => {
  const Service = remote.getService();
  const svc = await Service.lookup(`${channel}:${service}`);
  console.log("SVC", svc)
  return await svc[method](parameters);
}

module.exports = router;
