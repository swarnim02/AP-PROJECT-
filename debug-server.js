const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Debug server working");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint working" });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
});