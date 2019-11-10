const dotenv = require('dotenv')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
//Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const path = require('path')
const cors = require('cors')
const verifyToken = require('./routes/verifyToken')
const axios = require('axios')

const {getYoutubeVideoDataJson} = require('./getYoutubeVideo')
let top10VideoJson =  {status: "not available"}

getYoutubeVideoDataJson('nba top 10').then(data => top10VideoJson = data).catch(err => console.log(err))
setInterval(() => {
    getYoutubeVideoDataJson('nba top 10').then(data => top10VideoJson = data).catch(err => console.log(err))
}, 60*60*1000)


dotenv.config()

const port = process.env.PORT || 4444

mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(err)throw err;
    console.log('connected to db')
})


app.use('/', express.static(path.join(__dirname, '/frontend/koko')))
//Middleware
app.use(express.json())
app.use(cors())


//Route middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.get('/', (req, res) => {
    console.log('index')
    res.sendFile(path.join(__dirname, '/frontend/koko/index.html'))
})
app.get('/api/top10plays', verifyToken, (req, res) => {
    res.json({top10VideoJson})
    
} )





const getDate = (current = -1) => {
    let date = new Date()
    date.setDate(date.getDate() + current);
    let day = (date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`) 
    let month = (date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`)
    let year = date.getFullYear()
    let seconds = date.getSeconds()
    return `${year}${month}${day}`
}




app.get('/api/scoreboard', verifyToken, (req, res) => {
    axios.get(`http://data.nba.net/10s/prod/v1/${getDate().slice(0,8)}/scoreboard.json`)
    .then(data => {res.json({date: getDate(),data: data.data})})
    .catch(err => {console.log('axios scoreboard feed err')})   
})

app.get('/api/standings', verifyToken, (req, res) => {
    axios.get(`http://data.nba.net/10s/prod/v1/current/standings_conference.json`)
    .then(data => {
        res.json({east: data.data.league.standard.conference.east, west: data.data.league.standard.conference.west})})
    .catch(err => {console.log('axios scoreboard feed err')})   
})


app.get('*', (req, res) => {
    console.log('refirect *')
    res.redirect('/')
})


app.listen(port, ()=>{console.log(`Server is running on ${port}`)})