const express = require('express');
const router = express.Router();

const importantFunctionaryController = require('../../controllers/importantFunctionaryController');

//router.get('/', importantFunctionaryController.getImportantFunctionaries);
router.get('/viewImportantFunctionaries', importantFunctionaryController.viewImportantFunctionary);
router.get('/viewImportantFunctionaries/:id', importantFunctionaryController.viewFunctionaryDetails);

module.exports = router;