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
  addrecent: async function (req, res) {
    const uid = req.user.id;
    try {
      const rec = await recModel.findOne({ user_id: uid });
      // users recents list exists hence append only
      if (rec) {
        const word = req.params.wid;
        // if word already exists remove it & bring it to top
        const index = rec.words.indexOf(word);
        if (index > -1) {
          rec.words.splice(index, 1);
        }

        rec.words.unshift(word);
        if (rec.words.length > 10) {
          rec.words.pop();
        }
        await rec.save();
        res.status(200).json(rec);
      }
      // user doesnot have a recent list yet in db
      else {
        const newreclist = new recModel({
          user_id: uid,
          words: [req.params.wid],
        });
        const savedrec = await newreclist.save();
        res.status(200).json(savedrec);
      }
    } catch (err) {
      return res.status(500).json({
        message: "error adding recents",
        error: err,
      });
    }
  },
};
