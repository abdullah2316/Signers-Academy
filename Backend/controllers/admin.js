var AdminModel = require("../models/admin");
var DictionaryModel = require("../models/dictionary");
var UserModel = require("../models/user");
var UserModel = require("../models/user");

module.exports = {
  getadmin: async function (req, res) {
    const admin_id = req.admin.id;
    AdminModel.findOne({ _id: admin_id })
      .exec()
      .then((admins) => {
        return res.json(admins);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "No such admin.",
          error: err,
        });
      });
  },
  addword: async function (req, res) {
    const eng = req.body.name_eng;
    const urd = req.body.name_urdu;
    const vid = req.body.video_url;
    var dict = new DictionaryModel({
      name_eng: eng,
      name_urdu: urd,
      video_url: vid,
    });
    dict
      .save()
      .then(() => {
        return res.json(dict);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "failed to insert word",
          error: err,
        });
      });
  },
  removeword: async function (req, res) {
    const word_id = req.did;
    DictionaryModel.deleteOne({ _id: word_id })
      .exec()
      .then(() => {
        return res.json(dictionaries);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "failed to delete word",
          error: err,
        });
      });
  },
  updateword: async function (req, res) {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId(req.id); // replace with your object id
    const obj = await collection.findOne({ _id: id });

    // Modify the object properties
    obj.name_eng = req.body.name_eng;
    obj.name_urdu = req.body.name_urdu;
    obj.video_url = req.body.video_url;

    // Save the changes to the database
    await obj.save();
  },
  getusers: async function (req, res) {
    const query = UserModel.find();
    query
      .exec()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "retrieval error",
          error: err,
        });
      });
  },
  removeuser: async function (req, res) {
    const user_id = req.uid;
    UserModel.deleteOne({ _id: user_id })
      .exec()
      .then(() => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "failed to delete user",
          error: err,
        });
      });
  },
};
