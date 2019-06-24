require('dotenv').config();

const Department = require('../models/Department');
const Notice = require('../models/Notice');
const User = require('../models/User');

const getDepartments = async (req, res) => {
	try {
		let departments = await Department.find()
			.select('name', 'departmentCode')
			.sort('name');

		res.status(200).json({ message: 'department found!', departments });
	}
	catch (err) {
		res.status(400).json({ message: 'no department found!', departments: null });
	}

};

const viewDepartment = async (req, res) => {
	try{
		let faculties = await Department.findById(req.params.id)
			.select('name', 'departmentCode', 'faculties')
			.populate('name', 'designation')
			.sort ('name');
		res.status(200).json({ message: 'faculties found!', faculties });
	}
	catch(err) {
		res.status(400).json({ message: 'no faculties found!', faculties: null })
	}

};

const viewFacultyDetails = async (req, res) => {
	try{
		let details = await Department.findOne({ _id: req.params.id, faculties_id: req.params.faculty_id })
			.populate('name', 'designation', 'email', 'contactNo', 'cabinLocation', 'available', 'additional details')
			.sort('name');
		res.status(200).json({ message: 'details found!', details });
	}
	catch(err) {
		res.status(400).json({ message: 'no details found!', details: null });
	}

};

module.exports = { getDepartments, viewDepartment, viewFacultyDetails }