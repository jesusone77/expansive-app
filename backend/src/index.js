const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const locationRoutes = require('./routes/locations');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/locations', locationRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  });
});
