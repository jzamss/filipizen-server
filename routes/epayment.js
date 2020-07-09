const path = require("path");
const fs = require("fs");

const express = require("express");
const router = express.Router();

router.get("/sendtopartner", async (req, res) => {
  const mdFileName = path.join(__dirname, "..", "README.md");
  const md = fs.readFileSync(mdFileName);
  res.send(util.mdToHtml(md.toString()));
});

module.exports = router;
