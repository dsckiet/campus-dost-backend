require('dotenv').config();

const Hostel = require('../models/Hostel');
const Notice = require('../models/Notice');
const User = require('../models/User');

const getHostels = async (req, res) => {
	try {
		let hostels = await Hostel.find()
			.select('name', 'year')
			.sort('name');

		res.status(200).json({ message: 'hostels found!', hostels });
	}
	catch (err) {
		res.status(400).json({ message: 'no hostel found!', hostels: null });
	}

};

const viewHostel = async (req, res) => {
	try{
		let wardens = await Hostel.findById(req.params.id)
			.select('name', 'wardens')
			.populate('name', 'designation')
			.sort ('name');
		res.status(200).json({ message: 'faculties found!', wardens });
	}
	catch(err) {
		res.status(400).json({ message: 'no faculties found!', wardens: null })
	}

};

const viewWardenDetails = async (req, res) => {
	try{
		let details = await Hostel.findOne({ _id: req.params.id, wardens: req.params.warden_id })
			.populate('name', 'designation', 'email', 'contactNo', 'cabinLocation', 'available', 'additional details')
			.sort('name');
		res.status(200).json({ message: 'details found!', details });
	}
	catch(err) {
		res.status(400).json({ message: 'no details found!', details: null });
	}

};

module.exports = { getHostels, viewHostel, viewWardenDetails }