const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  // const userObj = {
  //   firstName: "Sandeep",
  //   lastName: "Gella",
  //   emailId: "Sandeep@gmail.com",
  //   password: "Sandeep@6",
  //   age: 25,
  //   gender: "male",
  // };
  //creating user model instance for database
  try {
    const userEmail = req.body.emailId;
    const userDetails = await User.find({});
    console.log("userDetails", userDetails);
    if (userEmail.include(userDetails)) {
      res.send("Email is already exist in our Database");
    } else {
      const user = new User(userObj);
      await user.save();
    }
    res.status(200).send("User Saved Successfully!!");
  } catch (err) {
    res.status(400).send("Please Enter Valid details" + err.message);
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
