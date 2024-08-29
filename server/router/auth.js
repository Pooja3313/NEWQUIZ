// const JobListing = require('../model/JoblistSchema');
// const mongoose =  require('mongoose');
const express =require('express');
const router = express.Router();
const authcontrollers = require("../controller/auth-controller");

router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route("/createtask").post(authcontrollers.createTask);
router.route("/updatetask/:taskID").put(authcontrollers.updateTask);
router.route("/alltaskget/:userID").get(authcontrollers.AlltaskGet);



module.exports = router;