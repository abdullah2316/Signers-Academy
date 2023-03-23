const dictionaryModel = require("../models/dictionary");

module.exports = {
  getall: async function (req, res) {
    const query = dictionaryModel.find().sort("name_eng");
    query
      .exec()
      .then((docs) => {
        let allDocs = [];
        let currAlphabet = "a";
        let words = [];
        for (const doc of docs) {
          if (doc.name_eng[0].toLocaleLowerCase() !== currAlphabet) {
            allDocs.push({
              title: currAlphabet,
              data: words,
            });
            currAlphabet = doc.name_eng[0].toLocaleLowerCase();
            words = [];
          }
          words.push({
            eng_word: doc.name_eng.toLocaleLowerCase(),
            urdu_word: doc.name_urdu,
            link: doc.video_url,
            id: doc._id,
          });
        }
        return res.json({
          data: allDocs,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "retrieval error",
          error: err,
        });
      });
  },
  search: async function (req, res) {
    let word = req.query.term;
    const regex = new RegExp(word, "i");
    try {
      const query = await dictionaryModel.find({
        name_eng: { $regex: regex },
      });
      if (!query) {
        return res.status(404).json({ message: "term not found" });
      }
      return res.json(query);
    } catch (err) {
      return res.status(500).json({ message: "retrieval error", error: err });
    }
  },
};
