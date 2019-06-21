const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: true,
		unique: true,
		max: 255,
		min: 3
	},
	category: {
		type: String,
		required: true,
		enum: ['faculty', 'warden', 'lead', 'bodies']
	}
	collegeId: {
		type: String,
		required: true,
		unique: true,
		max: 255
	},
	email: {
		type: String,
		required: true,
		unique: true,
		max: 255
	},
	contactNo: {
		type: String,
		required: true,
		unique: true
		max: 10
	},
	designation: {
		tyoe: String,
		required: true,
		max: 255
	},
	cabinLoc: {
		type: String,
		required: true,
		max: 500
	},
	canPost: {
		type: Boolean,
		required: true,
		enum: [0, 1]
	},
	//canPost and available are using following conventions
	//1 for yes and 0 for no..
	available: {
		type: Boolean,
		required: true,
		enum: [0, 1]
	}
});

module.exports = User = mongoose.model('User', userSchema);