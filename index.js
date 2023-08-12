const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { storage, cloudinary } = require("./cloudinary");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());
const upload = multer({ storage });

// single file upload in cloudinary
app.post("/image-upload", upload.single("file_name"), (req, res) => {
  res.json({
    url: req.file.path,
    filename: req.file.filename,
    originalname: image.originalname,
  });
});

app.get("/", (req, res) => {
  res.json({
    name: "sylvain niyonkuru",
    action: "trying to login please",
  });
});

//Multiple files upload using cloudinary,
app.post(
  "/multiple_images-upload",
  upload.array("file_name", 20),
  (req, res) => {
    const result = req.files.map((image) => {
      return {
        url: image.path,
        filename: image.filename,
      };
    });
    return res.json(result);
  }
);

app.post("/delete_image", async (req, res) => {
  // cloudinary.v2.api.delete_resources(['image1', 'image2'],
  //   function(error, result){console.log(result);});
  try {
    await cloudinary.uploader.destroy(req.body.filename);
    res.json({
      status: true,
      message: "yes, deleted from cloudinary",
    });
  } catch (error) {
    res.json({
      status: false,
      message: "no, something went wrong while deleting from cloudinary",
      error: error,
    });
  }
});
const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`server stated at port ${port}`));
