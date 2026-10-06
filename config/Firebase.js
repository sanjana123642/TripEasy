const admin = require("firebase-admin");

let firebaseApp = null;

try {
    if (process.env.FIREBASE_PROJECT_ID) {
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
            })
        });

        console.log("Firebase connected successfully");
    } else {
        console.log("Firebase credentials not configured yet");
    }
} catch (error) {
    console.log("Firebase initialization skipped:", error.message);
}

module.exports = firebaseApp;