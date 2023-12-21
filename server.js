require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const pokemonBoxesRoutes = require('./routes/pokemonBoxes');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User routes
app.use('/api/users', userRoutes);

// Pokemon Boxes routes
app.use('/api/pokemonBoxes', pokemonBoxesRoutes);
app.use('/api/userBoxes', pokemonBoxesRoutes);

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