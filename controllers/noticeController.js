require('dotenv').config();

const Notice = require('../models/Notice');
//const User = require('../models/User');

const getNotices = async (req, res) => {
	try {
		let notices = await Notice.find()
			.select('title', 'description', 'link', 'postedBy', 'postedOn')
			.populate('name')
			.sort({ 'postedOn': -1 });

		res.status(200).json({ message: 'posts found!', notices });
	}
	catch (err) {
		res.status(400).json({ message: 'no post found!', notices: null });
	}

};

module.exports = { getNotices }