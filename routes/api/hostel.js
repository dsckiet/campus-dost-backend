const express = require('express');
const router = express.Router();

const hostelController = require('../../controllers/hostelController');

router.get('/', hostelController.getHostels);
router.get('/viewHostels/:id', hostelController.viewHostel);
router.get('/viewHostels/:id/viewWarden/:warden_id', hostelController.viewWardenDetails);

module.exports = router;