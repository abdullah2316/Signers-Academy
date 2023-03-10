var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	
	email: {
		type: String,
		unique: true,  
		default: ""
	},
	password: {
		type: String,
		default: ""
	},
	name: {
		type: String,
		required: true

	},
	
}, { timestamps: true });

module.exports = mongoose.model('admin', adminSchema);
