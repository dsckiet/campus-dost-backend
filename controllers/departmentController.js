require('dotenv').config();

const Department = require('../models/Department');
const Notice = require('../models/Notice');
const User = require('../models/User');

const getDepartments = async (req, res) => {
	try {
		let departments = await Department.find()
			.select('name', 'departmentCode')
			.sort('name');

		res.status(200).json({ message: 'successful', departments });
	}
	catch (err) {
		res.status(400).json({ message: 'some error occured', departments: null });
	}

};

const viewDepartment = async (req, res) => {
	try{
		let departments = await Department.findById(req.params.id)
			.select('name', 'departmentCode', 'faculties')
			.populate('name', 'designation')
			.sort ('name');
		res.status(200).json({ message: 'department found!', departments });
	}
	catch(err) {
		res.status(400).json({ message: 'some error occured', departments: null })
	}

};

const viewFacultyDetails = async (req, res) => {
	try{
		let faculties = await Department.findById(req.params.id)
			.select('faculties')
			.populate('name', 'designation', 'department', 'email', 'contactNo', 'cabinLocation', 'available', 'additional details')
			.sort('name');
		res.status(200).json({ message: 'faculties found!', faculties });
	}
	catch(err) {
		res.status(400).json({ message: 'some error occured', faculties: null });
	}

};

module.exports = { getDepartments, viewDepartment, viewFacultyDetails }