const express = require('express');
const router = express.Router();

const hostelController = require('../../controllers/hostelController');

router.get('/', hostelController.getHostels);
router.get('/:id', hostelController.viewHostel);
router.get('/:id/:id', hostelController.viewWardenDetails);

module.exports = router;