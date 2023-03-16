var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recentSchema = new Schema({
	
    user_id: {
        type: String,
        required: true
      },
      words: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
              return v.length <= 10;
            },
            message: props => `${props.value} exceeds the limit of 10`
          }
      },
	
}, { timestamps: true });

module.exports = mongoose.model('recent', recentSchema);
