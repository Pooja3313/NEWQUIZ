const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require("cors");
// const mongoose = require('mongoose');
dotenv.config({ path: './config.env'});
require('./db/Conn');
const authRouter = require('./router/auth');


const corsOptions = {
    origin: "https://newquiz-mkcywnwtd-pooja3313s-projects.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
  app.use(cors(corsOptions))

app.use(express.json());
app.use("/api/authh", authRouter);

const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})
