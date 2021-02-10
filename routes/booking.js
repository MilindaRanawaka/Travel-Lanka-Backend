const router = require("express").Router();
let Booking = require("../models/booking.model");

//@route GET
//@desc Get All Bookings
router.route("/").get((req, res) => {
    Booking.find()
        .then((booking) => res.json(booking))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Add New Booking
router.route("/add").post((req, res) => {
    const arrivalDate = req.body.arrivalDate;
    const departureDate = req.body.departureDate;
    const note = req.body.note;
    const locations = req.body.locations;
    const hotelInfo = req.body.hotelInfo;
    const addedBy = req.body.addedBy;

    const newBooking = new Booking({
        arrivalDate,
        departureDate,
        note,
        locations,
        hotelInfo,
        addedBy,
    });

    newBooking
        .save()
        .then(() => res.json("Booking added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Get Specific Booking Using ID
router.route("/:id").get((req, res) => {
    Booking.findById(req.params.id)
        .then((booking) => res.json(booking))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE
//@desc Delete Specific Booking Using ID
router.route("/:id").delete((req, res) => {
    Booking.findByIdAndDelete(req.params.id)
        .then(() => res.json("Booking deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Filter Booking Name by Given Name
router.route("/find/:name").get((req, res) => {
    Booking.find({ categoryName: { $regex: req.params.name } })
        .then((booking) => res.json(booking))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Update Booking by using specific ID
router.route("/update/:id").post((req, res) => {
    console.log(req.params.categoryName);
    Booking.findById(req.params.id)
        .then((booking) => {
            booking.arrivalDate = req.body.arrivalDate;
            booking.departureDate = req.body.departureDate;
            booking.note = req.body.note;
            booking.locations = req.body.locations;
            booking.hotelInfo = req.body.hotelInfo;
            booking.addedBy = req.body.addedBy;

            booking
                .save()
                .then(() => res.json("Booking updated!"))
                .catch((err) => {
                    console.log(err);
                    res.status(400).json("Error: " + err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

//Export Route
module.exports = router;