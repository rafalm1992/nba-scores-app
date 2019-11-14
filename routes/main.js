const router = require('express').Router()
const verify = require('./verifyToken')
const {getYoutubeVideoDataJson} = require('../helpers/getYoutubeVideo')
const axios = require('axios')


router.get('/scoreboard', verify, (req, res) => {    
    const getDate = (current = -1) => {
        let date = new Date()
        date.setDate(date.getDate() + current);
        let day = (date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`) 
        let month = (date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`)
        let year = date.getFullYear()
        let seconds = date.getSeconds()
        return `${year}${month}${day}`
    }
        axios.get(`http://data.nba.net/10s/prod/v1/${getDate().slice(0,8)}/scoreboard.json`)
    .then(data => {res.json({date: getDate(),data: data.data})})
    .catch(err => {res.json({data: "Scoreboard is not available"})})   
})


router.get('/standings', verify, (req, res) => {
    axios.get(`http://data.nba.net/10s/prod/v1/current/standings_conference.json`)
    .then(data => {
        res.json({east: data.data.league.standard.conference.east, west: data.data.league.standard.conference.west})})
    .catch(err => {res.json({data: "Standings are not available"})})   
})

router.get('/top10plays', verify, (req, res) => {
    getYoutubeVideoDataJson('nba top 10')
    .then(data => res.json({data}))
    .catch(err => res.json({data: "Not available"})) 
})





module.exports = router
