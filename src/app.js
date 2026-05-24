const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  const { firstName, lastName, emailId, password } = userObj;
  const strongPassword = await bcrypt.hash(password, 10);

  //creating user model instance for database
  try {
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: strongPassword,
    });
    await user.save();
    res.status(200).send("User Saved Successfully!!");
  } catch (err) {
    res.status(400).send("Please Enter Valid details" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const userDetails = await User.findOne({ emailId: emailId });
    if (!userDetails) {
      res.send("Invalid entry");
    } else {
      const validDetails = await bcrypt.compare(password, userDetails.password);
      if (validDetails) {
        const token = jwt.sign({ _id: userDetails._id }, "Sandeepgella@2026");
        res.cookie("jwt", token);
        res.send("Login Successfully");
      } else {
        res.send("Invalid Credentails");
      }
    }
  } catch (err) {
    res.send(400).send("Invalid Credentails" + err.message);
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    const cookie = req.cookies;
    if (!user) {
      res.send("Invalid details");
    }
    const validUser = await jwt.verify(cookie.jwt, "Sandeepgella@2026");
    if (validUser) {
      res.send(user);
    } else {
      res.send("Token is matching...");
    }
  } catch (err) {
    res
      .status(400)
      .send("unable to get the user profile details" + err.message);
  }
});

// get 1 user details from database by emailId
app.get("/user/:id", async (req, res) => {
  const userEmailId = req.params.id;
  try {
    const userDetails = await User.findOne({ emailId: userEmailId });
    res.send(userDetails);
  } catch (err) {
    console.log("unable to retrive the user data" + err.message);
  }
});

// get all users from database
app.get("/user", async (req, res) => {
  try {
    const userDetails = await User.find({});
    res.status(200).send(userDetails);
  } catch (err) {
    res.status(400).send("unable to retrive user Data");
    console.log("unable to retrive user data" + err.message);
  }
});

// update userDetails by userId in DB
app.patch("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateDetails = req.body;
    await User.findByIdAndUpdate(userId, updateDetails, {
      runValidators: true,
    });
    res.status(200).send("user details updated successfully");
  } catch (err) {
    res.status(400).send("unable to update user details" + err.message);
  }
});

// delete user from Database by using Id
app.delete("/user/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    const userDetails = await User.findOne({ _id: userId });
    if (userDetails) {
      await User.findByIdAndDelete(userId);
      res.status(200).send("User deleted successfully");
    } else {
      res.send("userId details was not there in database");
    }
  } catch (err) {
    res.status(400).send("unable to delete user from Database" + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("Database connected Successfully!");
    app.listen(7777, () => {
      console.log("server upon running");
    });
  })
  .catch((err) => console.log("database not connected", err.message));
