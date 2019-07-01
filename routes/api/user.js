const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const userController = require('../../controllers/userController');

router.get('/', auth, userController.getProfile);
router.post('/editProfile', auth, userController.editProfile);
router.post('/changePassword', auth, userController.changePassword);
router.post('/changeStatus', auth, userController.changeStatus);
router.post('/postNotices', auth, userController.postNotices);

module.exports = router;