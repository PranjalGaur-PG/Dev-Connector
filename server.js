const express = require("express");
process.env["NODE_CONFIG_DIR"] = __dirname;
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init MiddleWare
app.use(
  express.json({
    extended: false,
  })
);

app.use(express.static("./client/build"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server started at port ${port}`));
