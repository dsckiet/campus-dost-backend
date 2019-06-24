require('dotenv').config();

const ImportantFunctionary = require('../models/ImportantFunctionary');
const Notice = require('../models/Notice');
const User = require('../models/User');

/*const getImportantFunctionaries = async (req, res) => {
	try {
		let importantFunctionaries = await ImportantFunctionary.find()
			.select('title')
			.sort('title');

		res.status(200).json({ message: 'functionaries found!', importantFunctionaries });
	}
	catch (err) {
		res.status(400).json({ message: 'no functionaries found!', importantFunctionaries: null });
	}

};
*/

const viewImportantFunctionary = async (req, res) => {
	try{
		let functionaries = await ImportantFunctionary.find()
			.select('functionaries')
			.populate('name', 'designation')
			.sort ('name');
		res.status(200).json({ message: 'functionaries found!', functionaries });
	}
	catch(err) {
		res.status(400).json({ message: 'no functionaries found!', functionaries: null })
	}

};

const viewFunctionaryDetails = async (req, res) => {
	try{
		let details = await ImportantFunctionary.findOne({ _id: req.params.id })
			.populate('name', 'designation', 'email', 'contactNo', 'cabinLocation', 'available', 'additional details')
			.sort('name');
		res.status(200).json({ message: 'details found!', details });
	}
	catch(err) {
		res.status(400).json({ message: 'no details found!', details: null });
	}

};

module.exports = { viewImportantFunctionary, viewFunctionaryDetails }