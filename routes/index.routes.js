const express = require("express");
const router = express.Router();
const authmiddleware = require("../middlewares/authe");
const firebase=require("../config/firebase.config")
//     const user = await userModel
const fileModel = require("../models/files.model");
const upload = require("../config/multer.config");
const user = require("../models/user.model");
const auth = require("../middlewares/authe");

router.get("/",(req,res)=>{
  res.render("register");
})
router.get("/home", authmiddleware, async (req, res) => {
  const userfiles = await fileModel.find({
    user: req.user.id,
  });

  res.render("home", {
    files: userfiles,
  });
});

router.post(
  "/upload",
  authmiddleware,
  upload.single("file"),
  async (req, res) => {
       if (!req.file) {
      return res.status(400).send("File not uploaded. Please select the file");
    }
    const newfile = await fileModel.create({
      pathid: req.file.path,
      originalname: req.file.originalname,
      user: req.user.id,
    });
    res.redirect("/home");
  }
);

router.get("/download/:pathid", authmiddleware, async (req, res) => {
  const loggedinuserid = req.user.id;
  const path = req.params.pathid;

  const file = await fileModel.findOne({
    user: loggedinuserid,
    pathid:path,
  });

  if(!file){
     return res.status(401).json({
        message:"Unauthorized"
    })
  }

  const signdurl=  await firebase.storage().bucket().file(path).getSignedUrl({
    action:'read',
    expires:Date.now() +60 * 1000
  })

  res.redirect(signdurl[0])




});





module.exports = router;
