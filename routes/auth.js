const router = require('express').Router()
const User = require('../model/User')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '1min'})
    res.header('auth-token', token).send(token)

})


module.exports = router