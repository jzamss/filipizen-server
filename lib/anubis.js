const path = require("path");
const fs = require("fs");

const connections = require("./connections");

let appServer;

/*=======================
* ROUTES
========================*/
const filipizenRoutes = require("../routes/filipizen");

const registerCustomRoutes = () => {
  const modulePath = path.resolve("modules");
  fs.readdirSync(modulePath, { withFileTypes: true }).forEach((f) => {
    if (f.isDirectory()) {
      const routeFile = path.resolve("modules", f.name, "routes.js") 
      const routes = require(routeFile);
      appServer.use(`/${f.name}`, routes);
    }
  });
};

const registerRoutes = () => {
  appServer.use("/filipizen", filipizenRoutes);
  registerCustomRoutes();
};

const start = (app) => {
  appServer = app;
  registerRoutes();
};

const getConnection = (connName) => {
  return connections.getConnection(connName);
};

module.exports = {
  start,
  getConnection,
};
