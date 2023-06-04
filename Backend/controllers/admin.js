var AdminModel = require("../models/admin");
var DictionaryModel = require("../models/dictionary");
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
    const id = req.params.id; // Assuming the object ID is passed as a parameter
    // Find the document by ID and update its properties
    DictionaryModel.findByIdAndDelete(id)
      .then((updatedDict) => {
        if (!updatedDict) {
          return res.status(404).json({
            message: "Word not found",
          });
        }
        return res.json(updatedDict);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Failed to delete word",
          error: err,
        });
      });
  },
  updateword: async function (req, res) {
    const eng = req.body.name_eng;
    const urd = req.body.name_urdu;
    const vid = req.body.video_url;
    const id = req.params.id; // Assuming the object ID is passed as a parameter
    // Find the document by ID and update its properties
    DictionaryModel.findByIdAndUpdate(
      id,
      { name_eng: eng, name_urdu: urd, video_url: vid },
      { new: true } // This option returns the updated document
    )
      .then((updatedDict) => {
        if (!updatedDict) {
          return res.status(404).json({
            message: "Word not found",
          });
        }
        return res.json(updatedDict);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Failed to update word",
          error: err,
        });
      });
    
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
    const id = req.params.id; // Assuming the object ID is passed as a parameter
    // Find the document by ID and update its properties
    UserModel.findByIdAndDelete(id)
      .then((updatedDict) => {
        if (!updatedDict) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        return res.json(updatedDict);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Failed to delete user",
          error: err,
        });
      });
  },
};
