const favModel = require("../models/favourite");
const dictModel = require("../models/dictionary");

module.exports = {
  add: async function (req, res) {
    const wid = req.params.wid;
    const uid = req.user.id;
    try {
      const fav = await favModel.findOne({ user_id: uid });
      //user doesn't have a fav list in DB
      if (!fav) {
        const newFavlist = new favModel({
          user_id: uid,
          words: [wid],
        });
        const savedfav = await newFavlist.save();
        res.status(200).json(savedfav);
      }
      // users fav list exists hence append only
      else {
        if (!fav.words.includes(wid)) {
          fav.words.push(wid);
          await fav.save();
        }
        res.status(200).json(fav);
      }
    } catch (err) {
      return res.status(500).json({
        message: "error retrieving fav list",
        error: err,
      });
    }
  },

  remove: async function (req, res) {
    const wid = req.params.wid;
    const uid = req.user.id;
    try {
      const fav = await favModel.findOne({ user_id: uid });
      if (!fav) {
        return res.status(404).json({
          message: "no such user",
        });
      } else {
        const index = fav.words.indexOf(wid);
        if (index !== -1) {
          fav.words.splice(index, 1);
          await fav.save();
        }
        res.status(200).json(fav);
      }
    } catch (err) {
      res.status(500).json({
        message: "error removing from fav list",
        error: err,
      });
    }
  },

  // get favourites list of currently loged-in user
  get: async function (req, res) {
    const uid = req.user.id;
    console.log(uid);
    try {
      const fav = await favModel.findOne({ user_id: uid });
      if (fav) {
        let formatted_favourites = [];
        // send formated data so it's easy to use in client side
        for (const w of fav.words) {
          const dw = await dictModel.findById(w);
          formatted_favourites.push({
            id: dw._id,
            name_eng: dw.name_eng,
            name_urdu: dw.name_urdu,
            link: dw.video_url,
          });
        }
        res.status(200).json(formatted_favourites);
      }
      // return an empty list and show an empty page to user
      // display message to add some words in favs
      else {
        res.status(200).json([]);
      }
    } catch (err) {
      return res.status(500).json({
        message: "error retrieving favs",
        error: err,
      });
    }
  },
  is_Fav: async function (req, res) {
    const uid = req.user.id;
    const wid = req.params.wid;

    try {
      const fav = await favModel.findOne({ user_id: uid });
      if (!fav) {
        return res.status(404).json({
          message: "no such user",
        });
      } else {
        const index = fav.words.indexOf(wid);
        if (index !== -1) {
          res.status(200).json({
            fav: true,
          });
        } else {
          res.status(200).json({
            fav: false,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
