const ctx = require("../lib/server-context");
const fetch = require("node-fetch");

const express = require("express");
const router = express.Router();

router.get("/service/metainfo", async (req, res) => {
  console.log("QUERY", req.query)
  const { serviceName, connection: connName  } = req.query; 
  try {
    const connection = ctx.findConnection(connName) 
    let url = "http://";
    url += connection["app.host"];
    url += "/" + (connection["app.cluster"] || "osiris3");
    url += "/json";
    url += "/" + (connection["app.context"] || "enterprise");
    url += "/" + serviceName + ".metaInfo";
    const retVal = await fetch(url);
    if (retVal.status !== 200) {
      throw retVal.statusText;
    }
    const sinfo = await retVal.json();
    let func = "function " + sinfo.serviceName + "(p) {\n";
    func += "this.proxy = p;\n";
    const keys = Object.keys(sinfo.methods);
    for (let i = 0; i < keys.length; i++) {
      const methodName = keys[i];
      const method = sinfo.methods[methodName];
      let args = "";
      let params = "";

      for (let idx = 0; idx < method.parameters.length; idx++) {
        args += `p${idx},`
        if (i > 0) params += ", ";
        params += `p${idx}`;
      }
      func += "this." + escapeMethodName(methodName) + "= function(";
      func += args;
      func += "handler) {\n";
      func += "return this.proxy.invoke(\"" + methodName + "\"";
      func += ",";
      func += "[" + params + "]";;
      func += ", handler );\n";
      func += "};\n";
    }
    func += "}"
    res.send(func);
  } catch (err) {
    console.log(err)
    res.status(404).send({error: err.toString()});
  }
});

const escapeMethodName = (name) => {
  if (/(delete|export|function|var|yield)/i.test(name)) {
    return `_${name}`;
  }
  return name;
}

module.exports = router;
