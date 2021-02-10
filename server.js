const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

//Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const LocationRouter = require("./routes/locations");
app.use("/locations", LocationRouter);
const BookingRouter = require("./routes/booking");
app.use("/bookings", BookingRouter);


app.listen(port, () => {
    console.log("Server runs on port : " + port);
});