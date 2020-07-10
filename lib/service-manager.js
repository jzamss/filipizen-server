// const ctx = require("../lib/server-context");
const fetch = require("node-fetch");
const connections = require("./connections");

const services = {};

const escapeMethodName = (name) => {
  if (/(delete|export|function|var|yield)/i.test(name)) {
    return `_${name}`;
  }
  return name;
};

const buildFunctionString = (sinfo) => {
  let func = "function " + sinfo.serviceName + "(p) {\n";
  func += "this.proxy = p;\n";
  const keys = Object.keys(sinfo.methods);
  for (let i = 0; i < keys.length; i++) {
    const methodName = keys[i];
    const method = sinfo.methods[methodName];
    let args = "";
    let params = "";
    for (let idx = 0; idx < method.parameters.length; idx++) {
      args += `p${idx}`;
      if (idx > 0) params += ", ";
      params += `p${idx}`;
    }
    func += "this." + escapeMethodName(methodName) + "= function(";
    func += args + (args.length > 0 ? "," : "");
    func += "handler) {\n";
    func += 'return this.proxy.invoke("' + methodName + '",';
    func += "[" + params + "]";
    func += ", handler );\n";
    func += "};\n";
  }
  func += "}";
  return func;
};

const buildService = async (serviceName, connName) => {
  const connection = connections.getConnection(connName);
  let url = connection.secured ? "https://" : "http://";
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
  return buildFunctionString(sinfo);
};

// router.post("/service/invoke", async (req, res) => {

// const invoke
//   const { service, args } = req.body;
//   const { name: methodName, action, connection: connName } = service;
//   const connection = ctx.getConnection(connName);

//   let url = "http://" + (connection["app.host"] || "localhost");
//   url += "/" + (connection["app.cluster"] || "osiris3");
//   url += "/json";
//   url += "/" + (connection["app.context"] || "enterprise");
//   url += "/" + methodName;
//   url += "." + action;

//   const hasArgs = Array.isArray(args) && args.length > 0;

//   const response = await fetch(url, {
//     method: "POST",
//     cache: "no-cache",
//     mode: "cors",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: hasArgs ? JSON.stringify(args[0]) : "",
//   });

//   if (response.status !== 200) {
//     res.status(400).send(response.statusText);
//   } else {
//     const result = await response.json();
//     res.json(result);
//   }
// });

const getServiceMeta = async (serviceName, connection) => {
  let service = services[serviceName];
  if (!service) {
    service = await buildService(serviceName, connection);
    services[serviceName] = service;
  }
  return service;
};

module.exports = {
  getServiceMeta,
};
