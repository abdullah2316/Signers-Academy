var UserModel = require("../models/user");

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
