const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const connectToDb = require("./middleware/db");
const PORT = process.env.PORT || 8000;
const userModel = require("./models/user.js");
const UserSignUp = require("./models/userSignup");
connectToDb();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "react-frontend/")));

// Multer configuration
let filePath = "";
const secretKey = "shyam124";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userDirectoryPath = path.join(__dirname, "/uploads", req.body.id);
    fs.mkdirSync(userDirectoryPath, { recursive: true });
    return cb(null, userDirectoryPath);
  },
  filename: function (req, file, cb) {
    filePath = `/${Date.now()}-${file.originalname}`;
    return cb(null, filePath);
  },
});

const upload = multer({ storage });

// Handle the POST request for /uploadPhoto
app.post("/uploadPhoto", upload.single("file"), async (req, res) => {
  try {
    // Access uploaded file details
    const photo = filePath;
    // Access form fields
    const id = req.body.id;
    const friendId = req.body.friendId;
    const password = req.body.password;
    const user = new userModel({
      id,
      friendId,
      password,
      photo,
    });

    await user.save();

    res.status(200).json({ message: "Upload successful", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some error occured! Try again", success: false });
  }
});

app.post("/signUp", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new UserSignUp({
      name,
      email,
      password,
    });
    await newUser.save();
    const token = jwt.sign(newUser.toObject(), secretKey, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "SignUp successfully", token, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Email is already in use", success: false });
  }
});

app.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserSignUp.findOne({ email });
    if (existingUser.email == email && existingUser.password == password) {
      const payload = {
        name: existingUser.name,
        password: existingUser.password,
        email: existingUser.email,
      };
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "1d",
      });

      return res
        .status(200)
        .json({
          message: "Welcome back" + existingUser.name,
          success: true,
          token,
        });
    }
    return res
      .status(400)
      .json({ message: "Check crediantials", success: false });
  } catch (error) {
    console.error("Error occured", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
