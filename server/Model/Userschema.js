const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // isactive
  // usertype
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },

  usertype: {
    type: String,
    enum: ["user", "admin"], 
    required: true,
  },
  isAdmin:{
    type: Boolean,
    default :false,
  },

//   secretKey: {
//     type: String,
//     required: function() {
//         return this.usertype === 'admin'; // Secret key is required only for admins
//     }
// },

});

//? secure the password with the bcrypt
Userschema.pre("save", async function () {
  // console.log("pre body", this); //before save all code inside ->this<- show
  const user = this;
  console.log("actual data ", this);

  if (!user.isModified) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    const hashedCpassword = await bcrypt.hash(user.cpassword, saltRound);
    user.password = hashedPassword;
    user.cpassword = hashedCpassword;
  } catch (error) {
    return next(error);
  }
});

// json web token : instance method
Userschema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email, 
        usertype: this.usertype, isValid: this.isValid },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error("Token Error: ", error);
  }
};

// comparePassword
Userschema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Userss = mongoose.model("USERSS", Userschema);
module.exports = Userss;
