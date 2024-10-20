const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require("cors");
// const mongoose = require('mongoose');
dotenv.config({ path: './config.env'});
require('./db/Conn');
const authRouter = require('./router/auth');

const allowedOrigins = [
  "https://newquiz-swart.vercel.app",
  "https://newquiz-mkcywnwtd-pooja3313s-projects.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          // Allow requests if origin is in the allowed list or it's a non-origin request (like from Postman)
          callback(null, true);
      } else {
          // Block requests from origins not in the list
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,  // Allow cookies or authentication headers
};

app.use(cors(corsOptions));




// const corsOptions = {
//     origin: "https://newquiz-swart.vercel.app",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
//   };
  
//   app.use(cors(corsOptions))

app.use(express.json());
app.use("/api/authh", authRouter);

const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})
