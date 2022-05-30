const express = require("express");
const app = express();
const api = require("./Api");
const morgan = require("morgan"); //Logger
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.set("port", process.env.PORT || 8081);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: "http://localhost:4400" }));
app.use("/api", api);
app.use(express.static("static"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(function(req, res) {
    const err = new Error("Not Found");
    err.status = 404;
    res.json(err);
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ProductsAPI", {
    useNewUrlParser: true,
});
const db = mongoose.connection;
// subscribing to event using .on
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
    console.log("Connected to mongo DB");

    app.listen(app.get("port"), function() {
        console.log("Api server listening on port " + app.get("port") + "!");
    });
});