const Booking = require("../models/Booking");
const Trip = require("../models/Trip");

// Create booking
const createBooking = async (req, res) => {
    try {
        const { tripId, seats } = req.body;

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        if (seats <= 0) {
            return res.status(400).json({
                message: "Seats must be greater than 0"
            });
        }

        if (trip.availableSeats < seats) {
            return res.status(400).json({
                message: "Not enough seats available"
            });
        }

        const totalAmount = trip.price * seats;

        const booking = await Booking.create({
            user: req.user.id,
            trip: trip._id,
            seats,
            totalAmount,
            paymentStatus: "Paid",
            bookingStatus: "Confirmed"
        });

        trip.availableSeats -= seats;

        await trip.save();

        // Send updated availability through Socket.io
        const io = req.app.get("io");

        io.emit("availabilityUpdated", {
            tripId: trip._id,
            availableSeats: trip.availableSeats
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Booking failed",
            error: error.message
        });
    }
};

// Get current user's bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user.id
        })
            .populate("trip")
            .populate("user", "name email");

        res.json(bookings);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch bookings",
            error: error.message
        });
    }
};

// Get one booking
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(
            req.params.id
        )
            .populate("trip")
            .populate("user", "name email");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json(booking);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch booking",
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBookingById
};