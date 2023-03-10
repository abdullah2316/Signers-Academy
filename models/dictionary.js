const mongoose = require("mongoose");
const { Schema } = mongoose;

const DictionarySchema = new Schema({
  name_eng: {
    type: String,
    required: true,
  },
  name_urdu: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Dictionary", DictionarySchema);
