const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: "String",
        required: true,
    },
    name:{
        type : "String"
    },
    password: {
        type: "String",
    },
    email:{
        type : "String"
    },
    contact:{
        type : "String"
    }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;