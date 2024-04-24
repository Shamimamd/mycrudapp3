require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const PORT = process.env.PORT || 6060;
const cors = require("cors");
const bodyparser = require("body-parser");
const router = require("./Routes/routes");

app.use(cors());
app.use(router);

app.use(express.json());
app.use(bodyparser.json());
app.use("/uploads", express.static("./uploads"));

app.get("/", (req, res) => {
  res.send("hello world");
  console.log("hello world");
});

// app.post("/upload", upload.single("userprofile"), async (req, res) => {
//   console.log(req.file);
//   // res.send(req.file);
//   console.log(req.body);
// });

app.listen(PORT, () => {
  console.log(`your port is running on port${PORT}`);
});
