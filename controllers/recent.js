const recModel = require("../models/recent");
const dictModel = require("../models/dictionary");

module.exports = {
    // get recent list of currently loged-in user
  get: async function (req, res) {
    const uid = req.user.id;
    console.log(uid);
    try {
      const rec = await recModel.findOne({ user_id: uid });
      if (rec) {
        let recents = [];
        for (const w of rec.words) {
          const dw = await dictModel.findById(w);
          recents.push({
            id: dw._id,
            name_eng: dw.name_eng,
            name_urdu: dw.name_urdu,
            link: dw.video_url,
          });
        }
        res.status(200).json(recents);
      }
      // return an empty list and show an empty page to user
      else {
        res.status(200).json([]);
      }
    } catch (err) {
      return res.status(500).json({
        message: "error retrieving recents",
        error: err,
      });
    }
  },
};