/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true }); // Import CORS and allow all origins

// Initialize Firebase Admin SDK to interact with Firestore
admin.initializeApp();
const db = admin.firestore();

// Function to handle form submissions
exports.submitContactForm = onRequest((req, res) => {
    cors(req, res, async () => { // Wrap the function with CORS middleware
        // Allow only POST requests
        if (req.method !== "POST") {
            res.status(405).send("Method Not Allowed");
            return;
        }

        // Extract form data from the request body
        const { firstName, lastName, email } = req.body;

        try {
            // Save to Firestore
            await db.collection("contacts").add({
                firstName,
                lastName,
                email,
                submittedAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            // Send success response with a CORS-enabled header
            res.status(200).send("Form submitted successfully");
        } catch (error) {
            console.error("Error writing document:", error);
            res.status(500).send("Error submitting form");
        }
    });
});
