import React, { useState, useEffect } from "react";
import axios from "axios";

const Standings = props => {
  const [eastStandings, setEastStandings] = useState([]);
  const [westStandings, setwestStandings] = useState([]);

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const res = axios({
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
          setwestStandings(games.west);
          return games;
        })
        .then(games => {
          setEastStandings(games.east);
          return games;
        })
        .then(games => console.log(games));
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
              <th className="conferences__win">W</th>
              <th>L</th>
              <th>PCT</th>
              <th>GB</th>
              <th>HOME</th>
              <th>AWAY</th>
              <th>DIV</th>
              <th>CONF</th>
              <th>STRK</th>
              <th>L10</th>
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
                    <td>{team.streak}</td>
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
              <th className="conferences__win">W</th>
              <th>L</th>
              <th>PCT</th>
              <th>GB</th>
              <th>HOME</th>
              <th>AWAY</th>
              <th>DIV</th>
              <th>CONF</th>
              <th>STRK</th>
              <th>L10</th>
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
                    <td>{team.streak}</td>
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
