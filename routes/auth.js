const router = require('express').Router()
const User = require('../model/User')
const {registerValidation, loginValidation, forgottenPasswordValidation} = require('../helpers/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const generator = require('generate-password')

router.post('/register', async (req, res)=>{
    //Let's validate the date before make user
    const {error} =  registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Checking if user already exist in database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('User already exist')

    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/forgottenPassword', async (req, res)=>{
    //Let's validate the date before make user
    const {error} =  forgottenPasswordValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Checking if user already exist in database

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('User not exist')
  
    
    const newPassword = generator.generate({
        length: 10,
        numbers: true
    });
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword    
    const savedUser = await user.save()

    async function main() {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rafal.mlynskix@gmail.com',
              pass: 'BASKETBALL'
            }
          });
          
          var mailOptions = {
            from: 'rafal.mlynskix@gmail.com',
            to: `${savedUser.email}`,
            subject: 'NBA scores/standings/top10plays APP new password',
            text: `Your new password: ${newPassword}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    


    try{
        main().catch(console.error);

        res.json({status: `Password was sent to ${req.body.email}`})
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res)=>{
    //Let's validate the date before make user
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Checking if user already exist in database
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email not found')

    //Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    const token = jwt.sign({_id: user._id, name: user.name}, 'adsdsae213432asdasdasd', {expiresIn: '15min'})
    res.header('auth-token', token).send(token)

})


module.exports = router