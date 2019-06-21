const express = require('express');
const router = express.Router();

const departmentController = require('../../controllers/departmentController');

router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.viewDepartment);
router.get('/:id/:id', departmentController.viewFacultyDetails);

module.exports = router;