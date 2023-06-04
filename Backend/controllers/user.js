const UserModel = require("../models/user");
const mailSender = require("../utils/emailService");
const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");
module.exports = {
  //register function
  getall: async function (req, res) {
    const query = UserModel.find().sort("name");
    query
      .exec()
      .then((docs) => {
        let allDocs = [];
        let currAlphabet = "a";
        let words = [];
        for (const doc of docs) {
          if (doc.name[0].toLocaleLowerCase() !== currAlphabet) {
            allDocs.push({
              title: currAlphabet,
              data: words,
            });
            currAlphabet = doc.name[0].toLocaleLowerCase();
            words = [];
          }
          words.push({
            name: doc.name.toLocaleLowerCase(),
            email: doc.email,
            id: doc._id,
          });
        }
        return res.json({
          data: allDocs,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "retrieval error",
          error: err,
        });
      });
  },
  getuser: async function (req, res) {
    const user_id = req.user.id;
    UserModel.findOne({ _id: user_id })
      .exec()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "No such user.",
          error: err,
        });
      });
  },
  getOTP: async function (req, res) {
    const email = req.body.email;
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "No such user" });
      } else {
        const secret = speakeasy.generateSecret();
        const otp = speakeasy.totp({
          secret: secret.base32,
          encoding: "base32",
          step: 300,
        });
        mailSender(email, otp);
        user.secret = secret.base32;
        await user.save();
        return res.json();
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "error retrieving user", error: err });
    }
  },
  verifyOTP: async function (req, res) {
    const otp = req.body.otp;

    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        const secret = user.secret;
        const verified = speakeasy.totp.verify({
          secret: secret,
          encoding: "base32",
          token: otp, // replace with actual token
          step: 300, // 5 minutes in seconds
        });
        if (verified) return res.json();

        //incorrect otp
        return res.status(401).json();
      } else {
        return res.status(404).json({ message: "No such user" });
      }
    } catch (err) {
      return res.status(500).json({ message: "server error" });
    }
  },
  setpassword: async function (req, res) {
    const email = req.body.email;
    const newPassword = req.body.password;
    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user.secret;
        const verified = speakeasy.totp.verify({
          secret: secret,
          encoding: "base32",
          token: req.body.otp, // replace with actual token
          step: 300, // 5 minutes in seconds
        });
        if (verified) {
          const pwd = await bcrypt.hash(newPassword, 10);
          user.password = pwd;
          await user.save();
          return res.json();
        }

        //incorrect otp
        return res.status(401).json({ message: "Invalid OTP or OTP expired" });
      } else {
        return res.status(404).json({ message: "No such user" });
      }
    } catch (err) {
      return res.status(500).json({ message: "server error" });
    }
    //
  },
  // user is logged in
  resetpassword: async function (req, res) {
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const user_id = req.user.id;
    console.log(user_id);
    try {
      const user = await UserModel.findById(user_id);
      if (user) {
        if (await bcrypt.compare(oldpassword, user.password)) {
          user.password = newpassword;
          await user.save();
          return res.json({ message: "password updated" });
        } else {
          return res.status(401).json({ message: "Invalid password" });
        }
      } else {
        return res.status(404).json();
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
 
};
