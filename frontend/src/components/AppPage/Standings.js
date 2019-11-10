import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Standings = (props) => {
    const [eastStandings, setEastStandings] = useState([])  
    const [westStandings, setwestStandings] = useState([])  

    const [feed, setFeed] = useState([])


    useEffect(()=>{
        const fetchData = () => {
            const res = axios({
                method: 'get',
                url:'/api/standings',
                headers: {
                    'auth-token': localStorage.getItem('b')
                }
            })
            .then(standings => {
                return standings.data})
            .then(games => {
                setwestStandings(games.west)
                return games
            })
            .then(games => {
                setEastStandings(games.east)
                return games
            })
            .then(games => console.log(games))
        }
        fetchData()
    }, [])
 

    return(
        <div>
            <h1 className="container__title">Standings {}</h1>
            <div className="conferences">
                <div className="conferences__east">
                    {eastStandings && eastStandings.map((team, indx) => {
                        return (<div key={indx}>
                            <span className="conferences__eastTeam"><b>{team.teamSitesOnly.teamNickname}</b> {team.win}-{team.loss}</span>
                        </div>)
                    })} 
                </div>
                <div className="conferences__west">
                    {westStandings && westStandings.map((team, indx) => {
                        return (<div key={indx}>
                            <span className="conferences__westTeam">{team.win}-{team.loss} <b>{team.teamSitesOnly.teamNickname}</b></span>
                        </div>)
                    })} 
                </div>
            </div>
        </div>
    )
}

export default Standings