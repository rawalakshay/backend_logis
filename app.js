const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const app = express();

const { connectDB } = require("./config/db")
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});