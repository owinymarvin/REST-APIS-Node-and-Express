import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import routes from "./src/routes/crmRoutes";

const app = express();
const port = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb");
mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to the MongoDB database.");
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving static files
app.use(express.static("public"));

routes(app);

app.get("/", (req, res) => {
  res.send(`Node and express server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(
    `Node & Express (MERN) Website is live at http://localhost:${port}`
  );
});
