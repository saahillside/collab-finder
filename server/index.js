const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Collab Finder Backend is running!');
});

// Use collabs route
const collabsRoutes = require('./routes/collabs');
const profilesRoute = require('./routes/profiles');
const responsesRoute = require('./routes/responses');
const notificationRoutes = require('./routes/notifications');


app.use('/api/collabs', collabsRoutes);
app.use('/api/profiles', profilesRoute);
app.use('/api/responses', responsesRoute);
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
