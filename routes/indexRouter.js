const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const projectModel = require("../models/projectModels");

const secret = "secret";

router.get("/", (req, res, next) => {
  res.render("index", { title: "express" });
});

router.post("/signUp", async (req, res) => {
  try {
    let { username, email, password } = await req.body;
    let useremail = await userModel.findOne({ email: email });
    if (useremail) {
      res.json({ success: false, message: "Email alerady exists" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          let user = userModel.create({
            username,

            email,
            password: hash,
          });

          res.json({ success: true, message: "User created successfully" });
        });
      });
    }
  } catch (err) {
    console.log(`Singup error:${err}`);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    // If user is not found, return an error
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Passwords match; create a JWT token
      const token = jwt.sign({ email: user.email, userId: user._id }, secret);
      return res.json({
        success: true,
        message: "User logged in successfully",
        token,
        userId: user._id,
      });
    } else {
      // Passwords do not match; return an error
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ success: false, message: "An error occurred during login" });
  }
});

router.post("/getUserDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({
      success: true,
      message: "User details fetched successfully",
      user: user,
    });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/createProject", async (req, res) => {
  let { userId, title } = req.body;
  console.log("Received data:", req.body);

  try {
    // Check if user exists
    let user = await userModel.findOne({ _id: userId });

    if (user) {
      // Create the project and await the result
      let project = await projectModel.create({
        title: title,
        createdBy: userId,
      });

      return res.json({
        success: true,
        message: "Project created successfully",
        projectId: project._id,
      });
    } else {
      return res.json({ success: false, message: "User not found!" });
    }
  } catch (error) {
    // Error handling
    console.error("Error creating project:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/getProjects", async (req, res) => {
  let { userId } = req.body;
  try {
    let user = await userModel.findOne({ _id: userId });
    if (user) {
      let projects = await projectModel.find({ createdBy: userId });
      console.log("Fetched Projects:", projects); // Log the projects to see what's returned
      return res.json({
        success: true,
        message: "Project fetched successfully",
        projects: projects,
      });
    } else {
      return res.json({ success: false, message: "User not found!" });
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.json({ success: false, message: "Server error occurred!" });
  }
});

router.post("/deleteProject", async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Find and delete the project
    const project = await projectModel.findByIdAndDelete(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });
    }

    return res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/getProjectCode", async (req, res) => {
  try {
    let { userId, projectId } = req.body;
    let user = await userModel.findOne({ _id: userId });
    if (user) {
      let project = await projectModel.findOne({ _id: projectId });
      if (project) {
        return res.json({
          success: true,
          message: "Project fetched successfully",
          project: project,
        });
      } else {
        return res.json({ success: false, message: "Project not found!" });
      }
    } else {
      return res.json({ success: false, message: "User not found!" });
    }
  } catch (err) {
    console.error(`Error occurred in getProjectCode route: ${err}`);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

router.post("/updateProjectCode", async (req, res) => {
  try {
    let { userId, projectId, htmlCode, cssCode, jsCode } = req.body;

    // Check if the user exists
    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Check if the project exists
    let project = await projectModel.findOne({ _id: projectId });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });
    }

    // Update the project
    await projectModel.findOneAndUpdate(
      { _id: projectId },
      { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
      { new: true } // Returns the updated document
    );

    return res.json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
