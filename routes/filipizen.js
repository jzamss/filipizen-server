const ctx = require("../lib/server-context");
const fetch = require("node-fetch");
const serviceMgr = require("../lib/service-manager");

const express = require("express");
const router = express.Router();

router.get("/service/metainfo", async (req, res) => {
  try {
    const { serviceName, connection} = req.query;
    const meta = await serviceMgr.getServiceMeta(serviceName, connection);
    res.send(meta);
  } catch(err) {
    res.status(400).send(err.toString());
  }
});

router.post("/service/invoke", async (req, res) => {
  const { service, args } = req.body;
  const { name: methodName, action, connection: connName} = service;
  const connection = ctx.getConnection(connName);

  let url = "http://" + (connection["app.host"] || "localhost");
  url += "/" + (connection["app.cluster"] || "osiris3");
  url += "/json";
  url += "/" + (connection["app.context"] || "enterprise");
  url += "/" + methodName;
  url += "." + action;

  const hasArgs = Array.isArray(args) && args.length > 0;

  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: hasArgs  ? JSON.stringify(args[0]) : ""
  });

  if (response.status !== 200) {
    res.status(400).send(response.statusText)
  } else {
    const result = await response.json();
    res.json(result);
  }
});

const escapeMethodName = (name) => {
  if (/(delete|export|function|var|yield)/i.test(name)) {
    return `_${name}`;
  }
  return name;
};

module.exports = router;
