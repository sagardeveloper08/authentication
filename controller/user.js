const { User } = require('../models/user');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendsms = require('../controller/twillo')

const adduser = async (req, res) => {
  try {
    // console.log(req.body)
    const emailExist = await User.findOne({ email: req.body.email })
    // console.log(emailExist);
    if (emailExist) {
      res.status(400).json({ "error": 'Email already Exist' })
      return;
    }
    else {
      const userDatabase = [];

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone

      });

      userDatabase.push(user);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const code = Math.floor(Math.random() * 100000);
      console.log(code, 'code')
      const welcomeMessage = `Welcome to Chillz! Your verification code is ${code}`;
      sendsms(user.phone, welcomeMessage);
      console.log(welcomeMessage, 'messagae')
      const users = await user.save();
      const payload = {
        user: {
          id: users.id
        }
      };
      jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 10000 }, function (err, token) {
        if (err) {
          res.send(err)
        }
        res.status(200).json({
          token,
          code,
          message: 'Account created successfully, kindly check your phone to activate your account!',
          data: user
        })
      })
    }

  }
  catch (err) {
    console.log(err);
  }
}

const getuser = async (req, res) => {
  let user = await User.find();

  if (!user)
    return res.status(404).send("No user Found");
  res.status(200).send(user);

  return;
}

module.exports = {
  adduser: adduser,
  getuser: getuser
}
