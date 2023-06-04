var UserModel = require("../models/user");
var AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
  createAdmin: async function (req, res) {
    //also check if fields are empty or not

    const password = await bcrypt.hash(req.body.password, 10);

    var admin = new AdminModel({
      email: req.body.email,
      password: password,
      name: req.body.name,
    });

    admin
      .save()
      .then(() => {
        return res.status(201).json(admin);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      });
  },
  Adminlogin: async (req, res) => {
    try {
      const email = req.body.email;

      const admin = await AdminModel.findOne({ email: email });

      if (!admin) {
        return res.status(401).json("Incorrect email or password!!");
      }

      // check if its password matches

      if (await bcrypt.compare(req.body.password, admin.password)) {
        const token = jwt.sign(
          { id: admin._id, email: admin.email },
          process.env.JWT_SEC_KEY
        );

        const { password, ...others } = admin._doc;

        object = {
          token: token,
          admin: { ...others },
        };
        res.status(200).json(object);
      } else {
        res.status(401).json("Incorrect password!");
      }
    } catch (e) {
      res.status(500).json(e);
    }
  },
  create: async function (req, res) {
    //also check if fields are empty or not

    const password = await bcrypt.hash(req.body.password, 10);

    var user = new UserModel({
      email: req.body.email,
      password: password,
      name: req.body.name,
      phone: req.body.phone,
    });

    user
      .save()
      .then(() => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      });
  },

  login: async (req, res) => {
    try {
      const email = req.body.email;

      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(401).json("Incorrect email or password!!");
      }

      // check if its password matches

      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SEC_KEY
        );

        const { password, ...others } = user._doc;

        object = {
          token: token,
          user: { ...others },
        };
        res.status(200).json(object);
      } else {
        res.status(401).json("Incorrect password!");
      }
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
