// // const ctx = require("../lib/server-context");
// const connections = require("./connections");
// const fetch = require("node-fetch");

// const services = {};


// const getUrl = (connection) => {
//   let url = connection.secured ? "https://" : "http://";
//   url += connection["app.host"];
//   url += "/" + (connection["app.cluster"] || "osiris3");
//   url += "/json";
//   url += "/" + (connection["app.context"] || "enterprise");
//   return url;
// };

// const buildFunctionString = (sinfo) => {
//   let func = "function " + sinfo.serviceName + "(p) {\n";
//   func += "this.proxy = p;\n";
//   const keys = Object.keys(sinfo.methods);
//   for (let i = 0; i < keys.length; i++) {
//     const methodName = keys[i];
//     const method = sinfo.methods[methodName];
//     let args = "";
//     let params = "";
//     for (let idx = 0; idx < method.parameters.length; idx++) {
//       args += `p${idx}`;
//       if (idx > 0) params += ", ";
//       params += `p${idx}`;
//     }
//     func += "this." + escapeMethodName(methodName) + "= function(";
//     func += args + (args.length > 0 ? "," : "");
//     func += "handler) {\n";
//     func += 'return this.proxy.invoke("' + methodName + '",';
//     func += "[" + params + "]";
//     func += ", handler );\n";
//     func += "};\n";
//   }
//   func += "}";
//   return func;
// };

// const buildService = async (serviceName, connName) => {
//   try {
//     const connection = connections.getConnection(connName);
//     let url = getUrl(connection);
//     url += "/" + serviceName + ".metaInfo";
//     const retVal = await fetch(url);
//     if (retVal.status !== 200) {
//       throw retVal.statusText;
//     }
//     const sinfo = await retVal.json();
//     const func = buildFunctionString(sinfo);
//     res.send(func);
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ error: err.toString() });
//   }
// };

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

// const escapeMethodName = (name) => {
//   if (/(delete|export|function|var|yield)/i.test(name)) {
//     return `_${name}`;
//   }
//   return name;
// };


// const getService = async (serviceName, connection) => {
//   let service = services[serviceName];
//   if (!service) {
//     service = await buildService(serviceName, connection);
//     services[serviceName] = service;
//   }
//   return service;
// };

// module.exports = {
//   getService,
// };
