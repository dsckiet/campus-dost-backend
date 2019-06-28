require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: true,
		max: 255,
		min: 3
	},
	category: [{
		type: String,
		required: true,
		enum: ['faculty', 'warden', 'lead', 'bodies']
	}],
	empId: {
		type: String,
		required: true,
		unique: true,
		max: 20
	},
	password: {
		type: String,
		required: true,
		max: 255,
		min: 5
	},
	role: {
		type: String,
		required: true,
		enum: ['admin', 'users']
	},
	email: [{
		type: String,
		required: true,
		unique: true,
		max: 255
	}],
	contactNo: [{
		type: String,
		required: true,
		unique: true,
		max: 10
	}],
	designation: {
		type: String,
		//required: true,
		//max: 255
	},
	cabinLocation: {
		type: String,
		required: true,
		max: 500
	},
	canPost: {
		type: Boolean,
		required: true,
		enum: ['true', 'false']
	},
	//canPost and available are using following conventions
	//1 for yes and 0 for no..
	available: {
		type: Boolean,
		required: true,
		enum: ['true', 'false']
	},
	additionalDetails: {
		type: String
	}
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, empId: this.email, name: this.name, role: this.role }, process.env.JWT_PRIVATE_KEY);
  return token;
}

module.exports = User = mongoose.model('User', userSchema);