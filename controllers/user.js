const UserModel = require("../models/user");
const mailSender = require("../utils/emailService");
const speakeasy = require("speakeasy");
module.exports = {
  //register function
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

        return res.json(verified);
      } else {
        return res.status(404).json({ message: "No such user" });
      }
    } catch (err) {
      return res.status(500).json({ message: "server error" });
    }
  },
};
