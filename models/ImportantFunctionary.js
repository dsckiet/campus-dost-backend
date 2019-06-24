const mongoose = require('mongoose');

const importantFunctionarySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		min: 3,
		max: 255
	},
	functionaries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	// collegeid: {
	// 	type: String,
	// 	unique: true,
	// 	required: true
	// }
});

module.exports = ImportantFunctionary = mongoose.model('ImportantFunctionary', importantFunctionarySchema);