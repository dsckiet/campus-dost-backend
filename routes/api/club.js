const express = require('express');
const router = express.Router();

const clubController = require('../../controllers/clubController');

router.get('/', clubController.getClubs);
router.get('/:id', clubController.viewClub);
router.get('/:id/:id', clubController.viewClubLeadDetails);

module.exports = router;