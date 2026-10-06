const Trip = require("../models/Trip");

// Get all trips + search
const getTrips = async (req, res) => {
    try {
        const { destination, date } = req.query;

        const filter = {};

        if (destination) {
            filter.destination = {
                $regex: destination,
                $options: "i"
            };
        }

        if (date) {
            const searchDate = new Date(date);

            const nextDay = new Date(searchDate);
            nextDay.setDate(nextDay.getDate() + 1);

            filter.date = {
                $gte: searchDate,
                $lt: nextDay
            };
        }

        const trips = await Trip.find(filter);

        res.json(trips);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch trips",
            error: error.message
        });
    }
};

// Get one trip
const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.json(trip);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch trip",
            error: error.message
        });
    }
};

// Create trip
const createTrip = async (req, res) => {
    try {
        const {
            title,
            destination,
            date,
            price,
            totalSeats
        } = req.body;

        const trip = await Trip.create({
            title,
            destination,
            date,
            price,
            totalSeats,
            availableSeats: totalSeats,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Trip created successfully",
            trip
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not create trip",
            error: error.message
        });
    }
};

// Update trip
const updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.json({
            message: "Trip updated successfully",
            trip
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not update trip",
            error: error.message
        });
    }
};

module.exports = {
    getTrips,
    getTripById,
    createTrip,
    updateTrip
};