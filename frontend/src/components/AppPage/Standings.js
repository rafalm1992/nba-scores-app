import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Standings = props => {
  const [eastStandings, setEastStandings] = useState([]);
  const [westStandings, setWestStandings] = useState([]);
  const [eastDescending, setEastDescending] = useState(['winPct', false]);
  const [westDescending, setWestDescending] = useState(['winPct', false]);

  const easternString = 'eastern'
  const westernString = 'western'
  const winString = 'win'
  const lossString = 'loss'
  const winPctString = 'winPct'
  const gamesBehindString = 'gamesBehind'
  const homeWinString = 'homeWin'
  const awayWinString = 'awayWin'
  const divWinString = 'divWin'
  const confWinString = 'confWin'
  const streakString = 'streak'
  const lastTewWinString = 'lastTenWin'

  const sortBy = (prop, standings) => {
    const standingsCopy = (standings === easternString) ? [...eastStandings] : [...westStandings];
    const descending = (standings === easternString) ? eastDescending[1] : westDescending[1];
    
    const sortedStandings = standingsCopy.sort((a, b) => {
      if (descending) {
        return b[prop] - a[prop];
      }
      return a[prop] - b[prop];
    });
    

    if(standings === easternString){
      setEastStandings(sortedStandings)
      setEastDescending([prop, !eastDescending[1]]);
    }else{
      setWestStandings(sortedStandings)
      setWestDescending([prop, !westDescending[1]]);
    }
  };

const getArrowWest = (prop) => {
  return westDescending[0] === prop &&  (westDescending[1] ? <span>&#9650;</span> : <span>&#9660;</span> )
}
const getArrowEast = (prop) => {
  return eastDescending[0] === prop &&  (eastDescending[1] ? <span>&#9650;</span> : <span>&#9660;</span> )
}

  useEffect(() => {
    const fetchData = () => {
      axios({
        method: "get",
        url: "/api/standings",
        headers: {
          "auth-token": localStorage.getItem("b")
        }
      })
        .then(standings => {
          return standings.data;
        })
        .then(games => {
          setWestStandings(games.west);
          return games;
        })
        .then(games => {
          setEastStandings(games.east);
          return games;
        })
    };
    fetchData();
  }, []);

  return (
    <div>
    <h1 className="container__title">Standings {}</h1>
        {!westStandings.length ? <div className="spinner"></div>: 
      <div className="conferences">
        <h3>East conference</h3>
        <div className="conferences__east">
          <table>
            <tr>
            <th className="conferences__eastTeam"></th>
              <th className="conferences__win" onClick={()=>sortBy(winString,easternString)}>W {getArrowEast(winString)}</th>  
              <th onClick={()=>sortBy(lossString, easternString)}>L {getArrowEast(lossString)}</th>
              <th onClick={()=>sortBy(winPctString, easternString)}>PCT {getArrowEast(winPctString)}</th>
              <th onClick={()=>sortBy(gamesBehindString, easternString)}>GB {getArrowEast(gamesBehindString)}</th>
              <th onClick={()=>sortBy(homeWinString, easternString)}>HOME {getArrowEast(homeWinString)}</th>
              <th onClick={()=>sortBy(awayWinString, easternString)}>AWAY {getArrowEast(awayWinString)}</th>
              <th onClick={()=>sortBy(divWinString, easternString)}>DIV {getArrowEast(divWinString)}</th>
              <th onClick={()=>sortBy(confWinString, easternString)}>CONF {getArrowEast(confWinString)}</th>
              <th className="inactive">STRK</th>
              <th onClick={()=>sortBy(lastTewWinString, easternString)}>L10 {getArrowEast(lastTewWinString)}</th>
            </tr>
            {eastStandings &&
              eastStandings.map((team, indx) => {
                return (
                  <tr key={indx} className="conferences__row">
                    <td className="conferences__eastTeam">
                      <b>{team.teamSitesOnly.teamNickname}</b>
                    </td>
                    <td className="conferences__win">{team.win}</td>
                    <td>{team.loss}</td>
                    <td>{team.winPct}</td>
                    <td>{team.gamesBehind}</td>
                    <td>
                      {team.homeWin}-{team.homeLoss}
                    </td>
                    <td>
                      {team.awayWin}-{team.awayLoss}
                    </td>
                    <td>
                      {team.divWin}-{team.divLoss}
                    </td>
                    <td>
                      {team.confWin}-{team.confLoss}
                    </td>
                    <td>{team.isWinStreak ? "W" : "L"}{team.streak}</td>
                    <td>
                      {team.lastTenWin}-{team.lastTenLoss}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <br />
        <br />
        <br />
        <h3>West conference</h3>
        <div className="conferences__west">
          <table>                                                   
            <tr>
            <th className="conferences__westTeam"></th>
              <th className="conferences__win" onClick={()=>sortBy(winString,westernString)}>W {getArrowWest(winString)}</th>  
              <th onClick={()=>sortBy(lossString, westernString)}>L {getArrowWest(lossString)}</th>
              <th onClick={()=>sortBy(winPctString, westernString)}>PCT {getArrowWest(winPctString)}</th>
              <th onClick={()=>sortBy(gamesBehindString, westernString)}>GB {getArrowWest(gamesBehindString)}</th>
              <th onClick={()=>sortBy(homeWinString, westernString)}>HOME {getArrowWest(homeWinString)}</th>
              <th onClick={()=>sortBy(awayWinString, westernString)}>AWAY {getArrowWest(awayWinString)}</th>
              <th onClick={()=>sortBy(divWinString, westernString)}>DIV {getArrowWest(divWinString)}</th>
              <th onClick={()=>sortBy(confWinString, westernString)}>CONF {getArrowWest(confWinString)}</th>
              <th className="inactive">STRK</th>
              <th onClick={()=>sortBy(lastTewWinString, westernString)}>L10 {getArrowWest(lastTewWinString)}</th>
            </tr>
            {westStandings &&
              westStandings.map((team, indx) => {
                return (
                  <tr key={indx} className="conferences__row">
                    <td className="conferences__westTeam">
                      <b>{team.teamSitesOnly.teamNickname}</b>
                    </td>
                    <td className="conferences__win">{team.win}</td>
                    <td>{team.loss}</td>
                    <td>{team.winPct}</td>
                    <td>{team.gamesBehind}</td>
                    <td>
                      {team.homeWin}-{team.homeLoss}
                    </td>
                    <td>
                      {team.awayWin}-{team.awayLoss}
                    </td>
                    <td>
                      {team.divWin}-{team.divLoss}
                    </td>
                    <td>
                      {team.confWin}-{team.confLoss}
                    </td>
                    <td>{team.isWinStreak ? "W" : "L"}{team.streak}</td>
                    <td>
                      {team.lastTenWin}-{team.lastTenLoss}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>}

    </div>
  );
};

export default Standings;
