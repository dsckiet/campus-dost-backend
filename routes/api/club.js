const express = require('express');
const router = express.Router();

const clubController = require('../../controllers/clubController');

router.get('/', clubController.getClubs);
router.get('/viewClubs/:id', clubController.viewClub);
router.get('/viewClubs/:id/viewClubLead/:clubLead_id', clubController.viewClubLeadDetails);

module.exports = router;