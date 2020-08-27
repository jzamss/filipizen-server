const calendar = require("../calendar/gcalendar");

const express = require("express");
const router = express.Router();

router.post("/event/insert", async (req, res) => {
  console.log("PARAMS", req.body);
  console.log("gcal", calendar);
  try {
    const html = await calendar.scheduleEvent(req.body);
    res.send({status: "OK", html});
  } catch (err) {
    console.log("ERR", err)
    res.send({error: err.toString()});
  }
})

router.get("/event/insert", async (req, res) => {
  const { event, args } = req.body;
  const html = await calendar.scheduleEvent(event);
  res.send({status: "OK", html});
})


module.exports = router;
