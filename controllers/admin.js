var AdminModel = require("../models/admin");

module.exports = {
  //register function
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
};
