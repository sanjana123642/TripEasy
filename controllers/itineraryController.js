const Itinerary = require("../models/Itinerary");

// Create itinerary
const createItinerary = async (req, res) => {
    try {
        const {
            tripId,
            day,
            activity,
            location
        } = req.body;

        const itinerary = await Itinerary.create({
            user: req.user.id,
            trip: tripId,
            day,
            activity,
            location
        });

        res.status(201).json({
            message: "Itinerary created successfully",
            itinerary
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not create itinerary",
            error: error.message
        });
    }
};

// Get user's itineraries
const getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({
            user: req.user.id
        }).populate("trip");

        res.json(itineraries);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch itineraries",
            error: error.message
        });
    }
};

// Get one itinerary
const getItineraryById = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(
            req.params.id
        ).populate("trip");

        if (!itinerary) {
            return res.status(404).json({
                message: "Itinerary not found"
            });
        }

        res.json(itinerary);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch itinerary",
            error: error.message
        });
    }
};

module.exports = {
    createItinerary,
    getItineraries,
    getItineraryById
};