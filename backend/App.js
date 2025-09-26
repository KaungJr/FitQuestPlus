var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
const path = require("path");

// Server setup
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

// // MySQL setup(Moe)
// const mysql = require("mysql2");
// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "Fadel77!",
//   database: "secoms3190",
// });

// MySQL(Kaung)
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "fallstudent",
  password: "fallstudent",
  database: "secoms3190",
});
// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage: storage });

// Create "uploads" folder if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Endpoint to get all contacts (GET)
app.get("/contact", (req, res) => {
  try {
    db.query("SELECT * FROM contact", (err, result) => {
      if (err) {
        console.error({ error: "Error reading all posts:" + err });
        return res
          .status(500)
          .send({ error: "Error reading all contacts" + err });
      }
      res.status(200).send(result);
    });
  } catch (err) {
    console.error({ error: "An unexpected error occurred" + err });
    res.status(500).send({ error: "An unexpected error occurred" + err });
  }
});

// POST Request - Login
app.post("/contact/login", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Username and password are required." });
    }

    // Query MySQL for matching username and password
    const query = "SELECT role FROM user WHERE user = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error("Database error during login:", err);
        return res
          .status(500)
          .send({ error: "An error occurred. Please try again." });
      }
      if (results.length === 0) {
        return res.status(401).send({ error: "Invalid username or password." });
      }
      const { role } = results[0];
      res.status(200).send({ role }); // Respond with the user's role
    });
  } catch (err) {
    console.error("Error in POST /contact/login", err);
    res
      .status(500)
      .send({ error: "An unexpected error occurred in login: " + err.message });
  }
});

// PUT Request - Update username
app.put("/contact/update/:username", (req, res) => {
  const { username } = req.params;
  const { newUsername, password } = req.body;

  if (!newUsername || !password) {
    return res
      .status(400)
      .json({ error: "New username and password are required." });
  }

  // Check if the current password matches
  const query = "SELECT * FROM user WHERE user = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database error during update:", err);
      return res
        .status(500)
        .json({ error: "Error checking user credentials." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Check if new username is available
    const checkUsernameQuery = "SELECT * FROM user WHERE user = ?";
    db.query(checkUsernameQuery, [newUsername], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Database error during username check:", checkErr);
        return res
          .status(500)
          .json({ error: "Error checking new username availability." });
      }

      if (checkResult.length > 0) {
        return res
          .status(400)
          .json({ error: "New username is already taken." });
      }

      // Proceed to update the username
      const updateQuery = "UPDATE user SET user = ? WHERE user = ?";
      db.query(
        updateQuery,
        [newUsername, username],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating username:", updateErr);
            return res.status(500).json({ error: "Error updating username." });
          }
          return res
            .status(200)
            .json({ message: "Username updated successfully." });
        }
      );
    });
  });
});

// DELETE Request - Delete account
app.delete("/contact/delete/:username", (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ error: "Password is required to delete account." });
  }

  // Check if the password is correct
  const query = "SELECT * FROM user WHERE user = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database error during deletion:", err);
      return res
        .status(500)
        .json({ error: "Error checking user credentials." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Proceed to delete the account
    const deleteQuery = "DELETE FROM user WHERE user = ?";
    db.query(deleteQuery, [username], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Error deleting user:", deleteErr);
        return res.status(500).json({ error: "Error deleting account." });
      }
      return res.status(200).json({ message: "Account deleted successfully." });
    });
  });
});

app.post("/contact/signup", async (req, res) => {
  const { username, password, confirmPassword, role } = req.body;

  // Ensure all fields are provided
  if (!username || !password || !confirmPassword || !role) {
    return res
      .status(400)
      .json({
        error: "Username, password, confirmPassword, and role are required.",
      });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Query MySQL to check if the user already exists in the 'user' column
    const query = "SELECT * FROM user WHERE user = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error("Database error during username check:", err);
        return res
          .status(500)
          .json({ error: "Error checking username availability." });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Username is already taken." });
      }

      // If username is available, proceed to insert the new user
      const insertQuery =
        "INSERT INTO user (user, password, role) VALUES (?, ?, ?)";
      db.query(
        insertQuery,
        [username, password, role],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting new user:", insertErr);
            return res.status(500).json({ error: "Error creating new user." });
          }
          return res.status(200).json({ message: "Signup successful!" });
        }
      );
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// Endpoint to add a new contact (POST)
app.post("/contact", upload.single("image"), (req, res) => {
  try {
    const { contact_name, phone_number, message } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if contact_name already exists
    const checkQuery = "SELECT * FROM contact WHERE contact_name = ?";
    db.query(checkQuery, [contact_name], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Database error during validation:", checkErr);
        return res
          .status(500)
          .send({ error: "Error checking contact name: " + checkErr.message });
      }
      if (checkResult.length > 0) {
        return res.status(409).send({ error: "Contact name already exists." });
      }

      // Insert new contact
      const query =
        "INSERT INTO contact (contact_name, phone_number, message, image_url) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [contact_name, phone_number, message, imageUrl],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: "Error adding contact" + err });
          } else {
            res.status(201).send("Contact added successfully");
          }
        }
      );
    });
  } catch (err) {
    console.error("Error in POST /contact:", err);
    res
      .status(500)
      .send({ error: "An unexpected error occurred: " + err.message });
  }
});

// Start server
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
