const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const connectToDb = require("./middleware/db");
const PORT = 8000;
const userModel = require("./models/user.js")
const UserSignUp = require("./models/userSignup");
const chatRoutes = require("./chatRoutes")
// const chatRoutes = require("./chatRoutes");
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
    const userDirectoryPath = path.join(
      __dirname,
      "..",
      "react-frontend/uploads",
      req.body.id,
      "/",
      req.body.friendId
    );
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
    const user = {
      friendId,
      password,
      photo,
    };

    const checkIdPresentOrNot = await UserSignUp.findOne({ id, password });
    if (!checkIdPresentOrNot) {
      res
        .status(404)
        .json({ message: "Your id or password is incorrect", success: false });
      return;
    }

    const isFriendIdPresent = checkIdPresentOrNot?.friends.some(
      (friend) => friend.friendId == friendId
    );
    if (checkIdPresentOrNot && !isFriendIdPresent) {
      checkIdPresentOrNot.friends.push(user);
      await UserSignUp.updateOne(
        { id: id },
        { friends: checkIdPresentOrNot.friends }
      );
      res.status(200).json({ message: "Friend Created", success: true });
    } else {
      res.status(200).json({ message: "Friend exit", success: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some error occurred! Try again", success: false });
  }
});

app.use("/chat", chatRoutes);

app.get("/chatRoutes/:userId/:friendId", async (req, res) => {
    res.send(req.params)
});

// Delete friend api from user friend list
app.delete("/deleteFriend", async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const getUserObj = await UserSignUp.findOne({ id });
    const updatedFriends = getUserObj.friends.filter(
      (friend) => friend.friendId !== friendId
    );

    await UserSignUp.updateOne({ id: id }, { friends: updatedFriends });

    res
      .status(200)
      .json({ message: "Friend deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some error occurred! Try again", success: false });
  }
});

app.post("/signUp", async (req, res) => {
  try {
    const name = req.body.name;
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new UserSignUp({
      name,
      id,
      email,
      password,
    });

    const payload = {
      name,
      id,
      email,
      password,
      friends: [0],
    };

    await newUser.save();
    const token = jwt.sign(payload, secretKey, {
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
      const token = jwt.sign(existingUser.toObject(), secretKey, {
        expiresIn: "1d",
      });

      return res.status(200).json({
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

app.get("/fetchUsers", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserSignUp.find();
    res.json({ message: "successfully fetched", success: true, users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
