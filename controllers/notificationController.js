const admin = require("firebase-admin");

const sendNotification = async (req, res) => {
    try {
        const {
            token,
            title,
            body
        } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Firebase token is required"
            });
        }

        if (!admin.apps.length) {
            return res.status(503).json({
                message: "Firebase is not configured yet"
            });
        }

        const message = {
            notification: {
                title: title || "TripEasy",
                body: body || "Your booking has been confirmed!"
            },
            token
        };

        const response = await admin.messaging().send(message);

        res.json({
            message: "Notification sent successfully",
            firebaseResponse: response
        });

    } catch (error) {
        res.status(500).json({
            message: "Notification failed",
            error: error.message
        });
    }
};

module.exports = {
    sendNotification
};