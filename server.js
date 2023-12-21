require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const pokemonBoxesRoutes = require('./routes/pokemonBoxes');
const path = require('path'); // Add this line to use the path module

const app = express();

app.use(express.json());

// User routes
app.use('/api/users', userRoutes);

// Pokemon Boxes routes
app.use('/api/pokemonBoxes', pokemonBoxesRoutes);
app.use('/api/userBoxes', pokemonBoxesRoutes);

// Middleware to serve static assets from the build folder
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Could not connect to MongoDB:', err));
