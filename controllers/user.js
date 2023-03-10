var UserModel = require("../models/user");

module.exports = {
  //register function
  getuser: async function (req, res) {
    var user_id = req.user._id;
    UserModel.findOne({ id: user_id })
      .exec()
      .then((users) => {
        console.log(user_id);
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "No such user.",
          error: err,
        });
      });

    // .exec((err, user) => {
    //   if (err) {
    //     return res.status(500).json({
    //       message: "Error when getting user.",
    //       error: err,
    //     });
    //   } else if (!user) {
    //     if (!user) {
    //       return res.status(404).json({
    //         message: "No such user",
    //       });
    //     }
    //     return res.json(user);
    //   }
    // });
  },
};
