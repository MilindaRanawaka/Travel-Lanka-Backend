const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Booking Model
const bookingSchema = new Schema(
    {
        arrivalDate: { type: String, required: true, trim: true },
        departureDate: { type: String, required: true, trim: true },
        note: { type: String, required: false, trim: true },
        locations: { type: [String], required: false, trim: true },
        hotelInfo: { type: String, required: true, trim: true },
        addedBy: { type: String, required: true, trim: true }
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

//Export Booking
module.exports = Booking;