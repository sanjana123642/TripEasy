const express = require("express");

const {
    createItinerary,
    getItineraries,
    getItineraryById
} = require("../controllers/itineraryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    createItinerary
);

router.get(
    "/",
    protect,
    getItineraries
);

router.get(
    "/:id",
    protect,
    getItineraryById
);

module.exports = router;