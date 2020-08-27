const calendar = require("../calendar/gcalendar");
const util = require("../lib/util");

const express = require("express");
const router = express.Router();

router.post("/event/insert", async (req, res) => {
  const eventInfo = getEventInfo(req) || req.body;
  console.log("eventInfo", eventInfo);

  if (util.isObjectEmpty(eventInfo)) {
    res.send({staus: "OK"});
  } else {
    try {
      const html = await calendar.insertEvent(eventInfo);
      console.log("Calendar event sent.");
      res.send({status: "OK", html});
    } catch (err) {
      console.log("ERR", err);
      res.send({error: err.toString()});
    }
  }
})

const getEventInfo = (req) => {
  if (req.body.data) {
    try {
      return JSON.parse(req.body.data);
    } catch(error) {
      throw {code: 400, error}
    }
  }
  return null;
}

module.exports = router;
