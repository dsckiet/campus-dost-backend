const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 50
		//enum: ['gargee', 'sarojini', 'saraswati', 'chandragupta', 'tagore', 'aryabhatt', 'atithi']
	},
	wardens: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

module.exports = Hostel = mongoose.model('Hostel', hostelSchema);