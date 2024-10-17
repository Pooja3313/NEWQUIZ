
const express = require('express');
const router = express.Router();
const authcontrollers = require("../controller/auth-controller");
const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/adminmiddleware");

router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route("/createtask").post(authcontrollers.createTask);
router.route("/updatetask/:taskID").put(authcontrollers.updateTask);
router.route("/alltaskget/:userID").get(authcontrollers.AlltaskGet);

// admin
router.route("/getAllUsers").get(authMiddleware, adminMiddleware, authcontrollers.getAllUsers);
router.route("/delete/:id").delete(authMiddleware, adminMiddleware, authcontrollers.deleteUserById);
router.route("/update/:id").patch(authMiddleware, adminMiddleware, authcontrollers.updateUserById);

module.exports = router;