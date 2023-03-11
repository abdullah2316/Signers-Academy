const mongoose = require("mongoose");
const XLSX = require("xlsx");
const dictionaryModel = require("../models/dictionary");

const populateDictionary = () => {
  // read data from Excel file
  const workbook = XLSX.readFile(
    "C:/Users/dell/Desktop/Semester 8/SIgners_Backend/Signers-Academy-Proto/utils/dictionary.xlsx"
  );
  const worksheet = workbook.Sheets["updated_dictionary2"];
  const data = XLSX.utils.sheet_to_json(worksheet);

  // loop through data and create new Mongoose documents
  for (let i = 0; i < data.length; i++) {
    const record = new dictionaryModel({
      name_eng: data[i].nameENG,
      name_urdu: data[i].nameUrdu,
      video_url: data[i].link,
    });

    record
      .save()
      .then((savedRecord) => {
        console.log(savedRecord._id);
      })
      .catch((err) => {
        console.log("error while saving");
      });
  }
};
module.exports = populateDictionary;
