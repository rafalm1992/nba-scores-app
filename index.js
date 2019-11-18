const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const mainRoute = require('./routes/main')

dotenv.config()

const port = process.env.PORT || 4444

mongoose.connect(process.env.MONGO_CONENCT, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(err)throw err;
})

//Middleware
app.use('/', express.static(path.join(__dirname, '/frontend/dist')))
app.use(express.json())
app.use(cors())


//Route middleware
app.use('/api/user', authRoute)
app.use('/api/', mainRoute)


app.get('/', (req, res) => {
    console.log('index')
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
})


app.get('*', (req, res) => {
    console.log('refirect *')
    res.redirect('/')
})


app.listen(port, ()=>{console.log(`Server is running on ${port}`)})
