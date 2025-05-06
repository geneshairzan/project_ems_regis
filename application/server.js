const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve the static files from the export folder
app.use(express.static(path.join(__dirname, "out")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "out", "index.html"));
});

app.listen(port, () => {
  // console.log(`Server is running on http://localhost:${port}`);
});
