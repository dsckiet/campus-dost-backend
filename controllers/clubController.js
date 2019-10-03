require("dotenv").config();

const Club = require("../models/Club");
// const Notice = require("../models/Notice");
// const User = require("../models/User");

const getClubs = async (req, res) => {
  try {
    let clubs = await Club.find()
      .select("name")
      .sort("name");

    res.status(200).json({ message: "clubs found!", clubs });
  } catch (err) {
    res.status(400).json({ message: "no club found in fetching!", clubs: null });
  }
};

const viewClub = async (req, res) => {
  try {
    let leads = await Club.findById(req.params.id)
      .select("name", "description", "leads")
      .populate("name", "designation")
      .sort("name");
    res.status(200).json({ message: "leads found!", leads });
  } catch (err) {
    res.status(400).json({ message: "no leads foundin fetching!", leads: null });
  }
};

const viewClubLeadDetails = async (req, res) => {
  try {
    let details = await Club.findOne({
      _id: req.params.id,
      leads_id: req.params.clubLead_id
    })
      .populate(
        "name",
        "designation",
        "email",
        "contactNo",
        "cabinLocation",
        "available",
        "additionalDetails"
      )
      .sort("name");
    res.status(200).json({ message: "details found!", details });
  } catch (err) {
    res.status(400).json({ message: "no details found in fetching!", details: null });
  }
};

module.exports = { getClubs, viewClub, viewClubLeadDetails };
