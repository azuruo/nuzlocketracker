require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));
