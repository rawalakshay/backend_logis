const express = require('express');
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

app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});