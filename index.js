const express = require("express");
const multer = require("multer");
const cors = require("cors");
const {storage, cloudinary} = require("./cloudinary");

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors());
const upload = multer({storage});

// single file upload in cloudinary
app.post("/image-upload", upload.single('file_name'), (req, res) => {
    res.json({
        url: req.file.path,
        filename:req.file.filename,
        originalname:image.originalname
    });
})

//Multiple files upload using cloudinary, 
app.post("/multiple_images-upload", upload.array("file_name", 20), (req, res) => {
    const result = req.files.map((image) => {
        return {
            url: image.path,
            filename:image.filename,
            originalname:image.originalname
        }
    })
    return res.json(result);
  })

app.post("/delete_image", async (req, res) => {
   try {
       await cloudinary.uploader.destroy(req.body.filename);
       res.json({
           status: true,
           message: "yes, deleted from cloudinary"
       });
   } catch (error) {
       res.json({
           status: false,
           message: "no, something went wrong while deleting from cloudinary",
           error:error
       });
   }
})

app.listen(2000, () => console.log(
    "server stated at port 2000"
))