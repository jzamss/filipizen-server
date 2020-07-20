const express = require("express");
const path = require("path");
const fs = require("fs");

const connections = require("./lib/connections");
const modules = require("./modules.js");

let appServer;

/*=======================
* ROUTES
========================*/
const filipizenRoutes = require("./routes/filipizen");

const getRouteFileName = (module, mapping) => {
  const mappingPaths = mapping.path.split(":");
  const routePaths = mappingPaths[1].split("/");
  return 
}

const registerCustomRoutes = (module) => {
  const paths = module.path.split("/");
  module.resolvedPath = path.resolve(...paths);
  const routePath = path.join(module.resolvedPath, "routes.js");
  if (!fs.existsSync(routePath)) {
    return;
  }

  module.routeMappings = require(routePath);
  console.log("MAPPING", module.routeMappings);

  const router = express.Router();
  module.routeMappings.forEach(mapping => {
    const routeFileName = getRouteFileName(module, mapping);
  });
  


  // fs.readdirSync(modulePath, { withFileTypes: true }).forEach((f) => {
  //   if (f.isDirectory()) {
  //     const routeFile = path.resolve("modules", f.name, "routes.js") 
  //     const routes = require(routeFile);
  //     appServer.use(`/${f.name}`, routes);
  //   }
  // });
};

const registerRoutes = () => {
  appServer.use("/filipizen", filipizenRoutes);
};

const loadModules = () => {
  modules.forEach(module => {
    registerCustomRoutes(module);
  })
}


const start = (app) => {
  appServer = app;
  loadModules();
  registerRoutes();
};

const getConnection = (connName) => {
  return connections.getConnection(connName);
};

module.exports = {
  start,
  getConnection,
};
