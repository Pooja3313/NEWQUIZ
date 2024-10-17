const Userss = require("../Model/Userschema");
const Task = require("../Model/Taskschema");

const register = async (req, res) => {
  try {
    const {name,email, phone,password,cpassword,usertype,secretKey } = req.body;

    const userExist = await Userss.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    } else if (password !== cpassword) {
      // return res.status(422).json({ error: "Passwords do not match." });
      return res.status(400).json({ error: "Passwords do not match." });
    }
    if (usertype === "admin" && secretKey !== "admins") {
      return res.status(403).json({ error: "Invalid secret key for admin registration." });
    }
    // if we don't want add secretkey ib schema or collection then we have not pass in userss.create
    const userCreated = await Userss.create({
      name,
      email,
      phone,
      password,
      cpassword,
      usertype,
      isAdmin: usertype === "admin" ? true : false,
      // isAdmin: usertype === "admin" && secretKey === "admins",
    });

    if (!userCreated) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({
      msg: `${
        usertype.charAt(0).toUpperCase() + usertype.slice(1)
      } Registration Successful`,
    });
    // token: await userCreated.generateToken(), userId: userCreated._id.toString(),
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await Userss.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      if (userExist.usertype === "user") {
        return res.status(201).json({
          status: 201,
          message: "User Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
          usertype: userExist.usertype.toString(),
          isAdmin: userExist.isAdmin,
        });
      } else if (userExist.usertype === "admin") {
        return res.status(202).json({
          status: 202,
          message: "Admin Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
          usertype: userExist.usertype.toString(),
          isAdmin: userExist.isAdmin,
        });
      } else {
        return res.status(401).json({ status: 401, message: "Login failed" });
      }
    } else {
      return res.status(400).json({ message: "Invalid email or passord " });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { questionText, answer, mistakes, status, userID } = req.body;

    const user = await Userss.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingTask = await Task.findOne({ questionText, userID });
    if (existingTask) {
      return res.status(400).json({ message: "Question already exists" });
    }

    const task = new Task({
      questionText,
      answer,
      mistakes,
      status,
      userID: user._id,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const AlltaskGet = async (req, res) => {
  try {
    const { userID } = req.params;

    const tasks = await Task.find({ userID });
    console.log(tasks);

    if (tasks.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "task retrieved successfully",
        tasks: tasks,
      });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateTask = async (req, res) => {
  try {
    const { taskID } = req.params;
    const { answer, mistakes, status } = req.body;

    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (answer !== undefined) task.answer = answer;
    if (mistakes !== undefined) task.mistakes = mistakes;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await Userss.find({ usertype: "user" }).select({
      password: 0,
      cpassword: 0,
    });
    // const users = await Userss.find().select({ password: 0, cpassword: 0, usertype: 0 });

    // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users." });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await Userss.deleteOne({ _id: id });
    return res.status(200).json({ message: "user deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updateData = await Userss.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  createTask,
  AlltaskGet,
  updateTask,
  getAllUsers,
  deleteUserById,
  updateUserById,
};
