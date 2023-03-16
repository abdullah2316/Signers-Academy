var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favouriteSchema = new Schema({
	
    user_id: {
        type: String,
        required: true
      },
      words: {
        type: Array,
        required: true
      },
	
}, { timestamps: true });

module.exports = mongoose.model('favourite', favouriteSchema);
