const router = require("express").Router();
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
  forgottenPasswordValidation
} = require("../helpers/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const generator = require("generate-password");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/forgottenPassword", async (req, res) => {
  const { error } = forgottenPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not exist");

  const newPassword = generator.generate({
    length: 10,
    numbers: true
  });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  const savedUser = await user.save();

  const main = async () => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: `${savedUser.email}`,
      subject: "NBA scores/standings/top10plays APP new password",
      text: `Your new password: ${newPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  try {
    main().catch(console.error);

    res.json({ status: `Password was sent to ${req.body.email}` });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.TOKEN_SECRET,
    { expiresIn: "15min" }
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
