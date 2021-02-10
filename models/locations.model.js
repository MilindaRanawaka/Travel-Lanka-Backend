const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Location Model
const locationSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        locationUrl: { type: String, required: false, trim: true },
        addedBy: { type: String, required: true, trim: true }
    },
    {
        timestamps: true,
    }
);

const Location = mongoose.model("Location", locationSchema);

//Export Location
module.exports = Location;