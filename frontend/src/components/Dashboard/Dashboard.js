import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.scss";
import Logo from "../Logo";
import SvgIcon from "../Icons/SvgIcon";
import Server from "./Server";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import SpanHtmlIcon from '../SpanHtmlIcon'

const Dashboard = props => {
  const [servers, setServers] = useState([]);
  const [descending, setDescending] = useState(true);
  const [isClicked, setIsClicked] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState({ status: false, message: "" });
  const URL = "http://playground.tesonet.lt/v1/servers";

  const checkToken = callback => {
    // if (localStorage.getItem("b") && localStorage.getItem("b").length === 32) {
    //   return callback();
    callback()
    // } else {
    //   pushToLogin();
    // }
  };
  const pushToLogin = () => {
    props.history.push("/");
  };
  const fetchData = () => {
    axios({
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("b")}`
      }
    })
      .then(res => {
        setServers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setFetchError({ status: true, message: err.message });
        setLoading(false);
      });
  };
  useEffect(() => {
    window.addEventListener("storage", function(e) {
      if (e.key === "b" && e.target.location.pathname === "/dashboard") {
        logout();
      }
    });
    checkToken(fetchData);
  }, []);

  const orderByServer = () => {
    const serversCopy = [...servers];
    const getServerNumber = server => {
      return parseInt(server.name.replace(/^\D+/g, ""), 10);
    };
    const sortArray = serversCopy.sort((a, b) => {
      if (descending) {
        return getServerNumber(b) - getServerNumber(a);
      }
      return getServerNumber(a) - getServerNumber(b);
    });
    setServers(sortArray);
    setDescending(!descending);
    setIsClicked("server");
  };

  const orderByDistance = () => {
    const serversCopy = [...servers];
    const sortArray = serversCopy.sort((a, b) => {
      if (descending) {
        return b.distance - a.distance;
      }
      return a.distance - b.distance;
    });
    setServers(sortArray);
    setDescending(!descending);
    setIsClicked("distance");
  };
  const logout = () => {
    localStorage.removeItem("b");
    pushToLogin();
  };
  const toggleSpanArrowAOnClick = (button) => {
    return isClicked===button && (descending ? (
      <SpanHtmlIcon className={'arrow'} icon={'arrowDown'}/>
    ) : (
      <SpanHtmlIcon className={'arrow'} icon={'arrowUp'}/>
    ))}
  return (
    <div>
      <div className="fixedHeaderWrapper">
        
        <div className="navContainer">
          <Logo className={'navContainer__Logo'} logoType="dashboard" />
          <div className="navContainer__LogoutButton" onClick={logout}>
            <SvgIcon icon={"logout"} />
            <span>Logout</span>
          </div>
        </div>


        <div className="sortByContainer">
          <div className="sortByContainer__server" onClick={orderByServer}>
            <span>SERVER</span>
            {toggleSpanArrowAOnClick('server')}
          </div>
          <div className="sortByContainer__distance" onClick={orderByDistance}>
          {toggleSpanArrowAOnClick('distance')}
          <span>DISTANCE</span>
          </div>
        </div>


      </div>
      <div className="blankBlock"></div>
      <div className="mainContent">
        {loading && !fetchError.status ? (
          <LoadingScreen />
        ) : (
          servers.map((item, indx) => {
            return (
              <Server key={indx} name={item.name} distance={item.distance} />
            );
          })
        )}
        {!loading && fetchError.status && (
          <ErrorScreen
            className={'errorScreen'}
            refreshComponent={fetchData} 
          />
        ) }
      </div>
    </div>
  );
};

export default Dashboard;
