const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
	topic: {
		type: String,
		required: true,
		min: 3,
		max: 255
	},
	description: {
		type: String,
		required: true
	},
	link: {
		type: String
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	postedOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = Notice = mongoose.model('Notice', noticeSchema);