require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const cors = require('cors');
const {connection} = require("./config/db");
const { authRouter } = require('./routes/Auth.route');
const { calculateRouter } = require('./routes/Calculate.route');

/// Middleware
app.use(express.json());
app.use(cors());

// All Routes
app.use("", authRouter);
app.use("", calculateRouter);

app.listen(PORT, () => {
    connection();
    console.log(`Server Running on http://localhost:${PORT}`);
});