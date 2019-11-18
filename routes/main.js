const router = require('express').Router()
const verify = require('./verifyToken')
const {getYoutubeVideoDataJson} = require('../helpers/getYoutubeVideo')
const axios = require('axios')

const getDate = () => {
    let date = new Date()
    let current = date.getUTCHours() < 6 ? -2 : -1
    date.setDate(date.getDate() + current);
    let day = (date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`) 
    let month = (date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`)
    let year = date.getFullYear()
    return `${year}${month}${day}`
}
const getDateString = () => {
    let date = new Date()
    let current = date.getUTCHours() < 6 ? -2 : -1
    date.setDate(date.getDate() + current);
    let day = (date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`) 
    let month
    let year = date.getFullYear()
    const getMonthString = () => {
        switch(date.getMonth()){
            case 0:
                return month="January"
            case 1:
                return month="February"
            case 2:
                return month="March"
            case 3:
                return month="April"
            case 4:
                return month="May"
            case 5:
                return month="June"
            case 6:
                return month="July"
            case 7:
                return month="August"
            case 8:
                return month="September"
            case 9:
                return month="October"
            case 10:
                return month="November"
            case 11:
                return month="December"
        }
    }
    return `${year} ${getMonthString()} ${day}`
    
}

router.get('/scoreboard', verify, (req, res) => {    

        axios.get(`http://data.nba.net/10s/prod/v1/${getDate().slice(0,8)}/scoreboard.json`)
    .then(data => {res.json({date: getDate(),data: data.data})})
    .catch(err => {res.json({err: "Scoreboard is not available"})})   
})


router.get('/standings', verify, (req, res) => {
    axios.get(`http://data.nba.net/10s/prod/v1/current/standings_conference.json`)
    .then(data => {
        res.json({east: data.data.league.standard.conference.east, west: data.data.league.standard.conference.west})})
    .catch(err => {res.json({err: "Standings are not available"})})   
})

router.get('/top10plays', verify, (req, res) => {
    getYoutubeVideoDataJson(`nba top 10 ${getDateString()}`)
    .then(data => res.json({data}))
    .catch(err => res.json({err: "Not available"})) 
})





module.exports = router
