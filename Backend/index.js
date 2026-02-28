const express = require('express');
const cors = require('cors');
// const admin = require('firebase-admin'); // Uncomment when Firebase keys are ready

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mock Firebase Init
// admin.initializeApp({ credential: admin.credential.cert(process.env.FIREBASE_CREDENTIALS) });

// Endpoints
app.post('/api/progress', (req, res) => {
    const { userId, magicMeter, currentRealm } = req.body;
    // Save to DB
    console.log(`Saved progress for ${userId}: Meter at ${magicMeter} in realm ${currentRealm}`);
    res.json({ success: true });
});

app.post('/api/story', (req, res) => {
    const { userId, mood, generatedStory } = req.body;
    // Save story to DB
    console.log(`Saved story for ${userId}`);
    res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Magic Backend running on port ${PORT}...`);
});
