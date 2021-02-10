const router = require("express").Router();
let Location = require("../models/locations.model");

//@route GET
//@desc Get All Locations
router.route("/").get((req, res) => {
    Location.find()
        .then((location) => res.json(location))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Add New Location
router.route("/add").post((req, res) => {
    const name = req.body.locationName;
    const description = req.body.locationDescription;
    const location = req.body.locationLocation;
    const locationUrl = req.body.locationUrl;
    const addedBy = req.body.addedBy;

    const newLocation = new Location({
        name,
        description,
        location,
        locationUrl,
        addedBy,
    });

    newLocation
        .save()
        .then(() => res.json("Location added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Get Specific Location Using ID
router.route("/:id").get((req, res) => {
    Location.findById(req.params.id)
        .then((location) => res.json(location))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE
//@desc Delete Specific Location Using ID
router.route("/:id").delete((req, res) => {
    Location.findByIdAndDelete(req.params.id)
        .then(() => res.json("Location deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Filter Location Name by Given Name
router.route("/find/:name").get((req, res) => {
    Location.find({ categoryName: { $regex: req.params.name } })
        .then((location) => res.json(location))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Update Location by using specific ID
router.route("/update/:id").post((req, res) => {
    console.log(req.params.categoryName);
    Location.findById(req.params.id)
        .then((location) => {
            location.name = req.body.locationName;
            location.description = req.body.locationDescription;
            location.location = req.body.locationLocation;
            location.locationUrl = req.body.locationUrl;

            location
                .save()
                .then(() => res.json("Location updated!"))
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