const dictionaryModel = require("../models/dictionary");

module.exports = {
  getall: async function (req, res) {
    const query = dictionaryModel.find();
    query
      .exec()
      .then((docs) => {
        return res.json(docs);
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
