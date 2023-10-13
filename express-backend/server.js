const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "react-frontend/")));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "/uploads/")); // specify the directory to store uploaded files
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`); // use the original filename
  },
});

const upload = multer({ storage });

// Handle the POST request for /uploadPhoto
app.post("/uploadPhoto", upload.single("file"), (req, res) => {
  // Access uploaded file details
  const file = req.file;
  console.log("shyam bhai inside the function");
  // Access form fields
  const id = req.body.id;
  const friendId = req.body.friendId;
  const password = req.body.password;

  // Process the data as needed (e.g., save to database, perform authentication, etc.)

  res
    .status(200)
    .json({ message: "Upload successful", file: file, id, friendId, password });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
