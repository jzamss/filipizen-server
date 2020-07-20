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

const registerCustomRoutes = (module) => {
  const paths = module.path.split("/");
  module.resolvedPath = path.resolve(...paths);
  const routePath = path.join(module.resolvedPath, "routes.js");
  if (!fs.existsSync(routePath)) {
    return;
  }

  module.routeMappings = require(routePath);
  const router = express.Router();
  module.routeMappings.forEach(mapping => {
    router.post("/:action", async (req, res) => {
      const urlPaths = req.originalUrl.split("/")
      const handlerPath = path.resolve(module.resolvedPath, ...urlPaths);
      const handler = require(handlerPath);
      handler(req, res);
    })
    appServer.use(`${mapping.route}`, router);
  });
};

const registerFilipizenRoutes = () => {
  appServer.use("/filipizen", filipizenRoutes);
};

const loadModules = () => {
  modules.forEach(module => {
    registerCustomRoutes(module);
  })
}


const start = (app) => {
  appServer = app;
  registerFilipizenRoutes();
  loadModules();
};

const getConnection = (connName) => {
  return connections.getConnection(connName);
};

module.exports = {
  start,
  getConnection,
};
