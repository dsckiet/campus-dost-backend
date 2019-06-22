const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 50
		//enum: ['Computer Science', 'Information Technology', 'Electronics & Communication', 'Mechanical', 'Electrical', 'Civil', 'Electronics & Instrumentation', 'Pharmacy', 'MCA', 'MBA']
	},
	departmentCode: {
		type: String,
		required: true,
		unique: true
	},
	faculties: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

module.exports = Department = mongoose.model('Department', departmentSchema);