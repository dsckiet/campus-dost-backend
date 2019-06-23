const express = require('express');
const router = express.Router();

const departmentController = require('../../controllers/departmentController');

router.get('/', departmentController.getDepartments);
router.get('/viewDepartments/:id', departmentController.viewDepartment);
router.get('/viewDepartments/:id/viewFaculty/:faculty_id', departmentController.viewFacultyDetails);

module.exports = router;