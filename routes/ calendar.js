const gcal = require("../calendar/gcalendar");

const express = require("express");
const router = express.Router();

router.post("/insert", async (req, res) => {
  const html = await gcal.scheduleEvent(req.body);
  res.send({status: "OK", html});
})

router.get("/insert", async (req, res) => {
  const { event, args } = req.body;
  const html = await gcal.scheduleEvent(event);
  res.send({status: "OK", html});
})


module.exports = router;
