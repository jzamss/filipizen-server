const path = require("path");
const fs = require("fs");

const connections = {};

const loadConnection = connName => {
  const jsonFile = fs.readFileSync(path.join(__dirname, "..", "connections", connName))
  return JSON.parse(jsonFile.toString());
}

const findConnection = (connName) => {
  let connection = connections[connName];
  if (!connection) {
    connection = loadConnection(connName);
    connections[connName] = connection
  }
  return connection;
}



module.exports = {
  findConnection
}