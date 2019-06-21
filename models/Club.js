const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 50
		//enum: ['dsc', 'erp', 'ccell', 'phoenix', 'kommotion', 'tedx', 'innogeeks', 'music club', 'movies club', 'uddeshhya']
	},
	description: {
		type: String,
		required: true
	},
	leads: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = Club = mongoose.model('Club', clubSchema);