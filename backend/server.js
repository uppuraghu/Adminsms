const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Created uploads directory at ${uploadDir}`);
      }
      cb(null, uploadDir);
    } catch (error) {
      console.error(`Error creating uploads directory: ${error.message}`);
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// File paths for data storage
const SERVICES_DATA_FILE = path.join(__dirname, "servicesData.json");
const POST_DATA_FILE = path.join(__dirname, "postsData.json");

// In-memory storage
let services = [];
let posts = [];

// Load data from files on startup
const loadData = async (filePath) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fsPromises.writeFile(filePath, JSON.stringify([], null, 2));
      return [];
    }
    console.error(`Error loading data from ${filePath}:`, error);
    return [];
  }
};

// Save data to files
const saveData = async (filePath, dataArray) => {
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(dataArray, null, 2));
  } catch (error) {
    console.error(`Error saving data to ${filePath}:`, error);
    throw error;
  }
};

// Initialize data on server start
const initializeData = async () => {
  services = await loadData(SERVICES_DATA_FILE);
  posts = await loadData(POST_DATA_FILE);
  console.log("Data loaded successfully");
};
initializeData();

// Services Endpoints
app.post("/services/submit", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    const newService = {
      id: Date.now().toString(),
      name,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      timestamp: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    };

    services.push(newService);
    await saveData(SERVICES_DATA_FILE, services);

    res
      .status(201)
      .json({ message: "Service saved successfully!", service: newService });
  } catch (error) {
    console.error("Error saving service:", error);
    res
      .status(500)
      .json({ message: "Error saving service", error: error.message });
  }
});

app.get("/services", async (req, res) => {
  try {
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
});

app.delete("/services/:id", async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceIndex = services.findIndex(
      (service) => service.id === serviceId
    );

    if (serviceIndex === -1) {
      return res.status(404).json({ message: "Service not found" });
    }

    services.splice(serviceIndex, 1);
    await saveData(SERVICES_DATA_FILE, services);

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
});

// Posts Endpoints
app.post("/post/submit", upload.single("image"), async (req, res) => {
  try {
    const { username, specialist, description, emoji } = req.body;

    if (!username || !specialist || !description) {
      return res.status(400).json({
        message: "Username, specialist, and description are required",
      });
    }

    const newPost = {
      id: Date.now().toString(),
      username,
      specialist,
      description,
      emoji: emoji || "",
      specialId: `#${specialist.toLowerCase()}`,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      timestamp: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await saveData(POST_DATA_FILE, posts);

    res
      .status(201)
      .json({ message: "Post saved successfully!", post: newPost });
  } catch (error) {
    console.error("Error saving post:", error);
    res
      .status(500)
      .json({ message: "Error saving post", error: error.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});

app.delete("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    posts.splice(postIndex, 1);
    await saveData(POST_DATA_FILE, posts);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
