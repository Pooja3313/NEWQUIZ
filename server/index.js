const dotenv = require('dotenv');
const express = require('express');
const app = express();
// const mongoose = require('mongoose');
dotenv.config({ path: './config.env'});
require('./db/Conn');
const authRouter = require('./router/auth');

app.use(express.json());
app.use("/api/authh", authRouter);

const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})
