const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // serverSelectionTimeoutMS: 90000, // Set timeout to 10 seconds
    // socketTimeoutMS: 45000,
}).then(() => {
    console.log(`Connection Succesfull`);
}).catch((err) => { console.log(`No Connection.`)});
