const mongoose = require("mongoose");

const fileschema = new mongoose.Schema({
  pathid: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const uploadedfile=mongoose.model("uploadedfiles", fileschema);


module.exports = uploadedfile;