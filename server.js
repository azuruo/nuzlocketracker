require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const pokemonBoxesRoutes = require('./routes/pokemonBoxes');

const app = express();

app.use(cors());

app.use(express.json());


// User routes
app.use('/api/users', userRoutes);

// Pokemon Boxes routes
app.use('/api/pokemonBoxes', pokemonBoxesRoutes);
app.use('/api/userBoxes', pokemonBoxesRoutes);

// Connect to MongoDB
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});