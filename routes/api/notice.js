const express = require('express');
const router = express.Router();

const noticeController = require('../../controllers/noticeController');

router.get('/', noticeController.getNotices);

module.exports = router;