require('dotenv').config();

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//const User = require('./models/User');
const bcrypt = require('bcrypt');

//const Notice = require('../models/Notice');
const User = require('../models/User');

const loginUser = async (req, res) => {
	try {
		let user = await User.findOne({ empId: req.body.empId });
		if(!user) return res.status(200).json({ message: 'user not registered', user: null });

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if(!validPassword) return res.status(200).json({ message: 'invalid password', user: null });

		const token = user.generateAuthToken();
		res.header('x-auth-token', token);
		return res.status(200).json({ message: `login success and the token is: ${ token }`, user: user});
	}
	catch (err) {
		return res.status(400).json({ message: 'error while signing in', user: null });
	}

};

const getProfile = async (req, res) => {
	try{
		const user = await User.findById(req.user._id)
			.select('name', 'empId', 'email', 'contactNo', 'designation', 'cabinLocation', 'available', 'additionalDetails');
		return res.send(user);

	}
	catch (err) {
		return res.status(400).json({ message: 'user can\'t be fetched!' });
	}
}

const changeStatus = async (req, res) => {
	try{
		
	}
	catch (err) {
		
	}
}

const postNotices = async (req, res) => {
	try{

	}
	catch (err) {

	}
}

const createUser = async (req, res) => {
	const role = req.user.role;
	try {
		let admin = await User.findOne({ empId: req.user.empId, role: 'admin' });
		if(!admin) return res.status(400).json({ message: 'not authorised', user: null });

		let user = await User.findOne({ empId: req.body.empId });
		if(user) return res.status(200).json({ message: 'user already exist', user: null });

		let newUser = new User({
			name: req.body.name,
			category: req.body.category,
			empId: req.body.empId,
			password: req.body.password,
			role: req.body.role,
			email: req.body.email,
			contactNo: req.body.contactNo,
			designation: req.body.designation,
			cabinLocation: req.body.cabinLocation,
			canPost: req.body.canPost,
			available: req.body.available,
			additionalDetails: req.body.additionalDetails
		});

		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(newUser.password, salt);
		await newUser.save();
		return res.status(200).json({ message: 'user created successfully', newUser })

	}
	catch (err) {
		return res.status(400).json({ message: 'error while creating user', user: null })

	}
}

module.exports = { loginUser, getProfile, changeStatus, postNotices, createUser }