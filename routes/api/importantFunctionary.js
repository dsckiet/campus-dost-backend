const express = require('express');
const router = express.Router();

const importantFunctionaryController = require('../../controllers/importantFunctionaryController');

router.get('/', importantFunctionaryController.getImportantFunctionaries);
router.get('/:id', importantFunctionaryController.viewImportantFunctionary);
router.get('/:id/:id', importantFunctionaryController.viewFunctionaryDetails);

module.exports = router;