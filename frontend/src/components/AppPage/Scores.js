import React, {useState, useEffect} from "react";
import axios from 'axios'
import './AppPage.scss'

const Scores = (props) => {
    const [awayScore, setAwayScore] = useState('')
    const [awayTricode, setAwayTricode] = useState('')
    const [homeScore, setHomeScore] = useState('')
    const [homeTricode, setHomeTricode] = useState('')
    const [feed, setFeed] = useState([])
    const [date, setDate] = useState('')


    useEffect(()=>{
        const fetchData = () => {
            const res = axios({
                method: 'get',
                url:'/api/scoreboard',
                headers: {
                    'auth-token': localStorage.getItem('b')
                }
            })
            .then(games => {
                setDate(games.data.date)
                return games.data.data.games})
            .then(games => {
                setFeed(games)
                return games
            })
            .then(games => console.log(games))
        }
        fetchData()
    }, [])



  return (
      <div className="scoreBoard">
        <h1 className="container__title">Scores</h1>
        {date && <div className="scoreBoard__CurrentDay"><h3>Scores for November {date.slice(-2)[0] === '0' ? date.slice(-1):date.slice(-2)}, {date.slice(0, 4)}</h3></div>}
        {feed.map(game => {
            return <GameBoard awayTricode={game.vTeam.triCode} awayScore={game.vTeam.score} homeTricode={game.hTeam.triCode} homeScore={game.hTeam.score}/>
        })} 
        {!feed && <h1>no feed</h1>}
       
    </div>
  )

}

const GameBoard = (props) => {
    console.log(props)
    return (
        <div className="gameBoard">
            <div className="gameBoard__container">
                <div className="gameBoard__side">

                    
                    <div className="gameBoard__image">
                        <img src={`https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/${(props.awayTricode.toLowerCase() === "nop") ? "no" : ''}${props.awayTricode.toLowerCase() === "uta" ? "utah" : ''}${(props.awayTricode.toLowerCase() !== "nop" && props.awayTricode.toLowerCase() !== "uta") ? props.awayTricode.toLowerCase() : ''}.png&h=20&w=20`}/>
                    </div>
                    <div className="gameBoard__title">
                        <span>{props.awayTricode}</span>
                    </div>

                </div>
                <div className="gameBoard_score">
                    {props.awayScore}
                </div>
            </div>
            <div className="gameBoard__container">
                <div className="gameBoard__side">

                    
                    <div className="gameBoard__image">
                    <img src={`https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/${(props.homeTricode.toLowerCase() === "nop") ? "no" : ''}${props.homeTricode.toLowerCase() === "uta" ? "utah" : ''}${(props.homeTricode.toLowerCase() !== "nop" && props.homeTricode.toLowerCase() !== "uta") ? props.homeTricode.toLowerCase() : ''}.png&h=20&w=20`}/>
                    </div>
                    <div className="gameBoard__title">
                        <span>{props.homeTricode}</span>
                    </div>

                </div>
                <div className="gameBoard_score">
                    {props.homeScore}
                </div>
            </div>
        </div>
    )
}

export default Scores