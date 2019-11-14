import React, {useState, useEffect} from 'react'
import './appPage.scss'
import '../Dashboard/dashboard.scss'
import TopPlays from './TopPlays'
import Standings from './Standings'
import jwt from 'jsonwebtoken'
import SvgIcon from "../Icons/SvgIcon";
import Scores from './Scores'
import axios from 'axios'

const App = (props) => {
    const [activeComponent, setActiveComponent] = useState('scores')
    const [name, setName] = useState('')
    const [videoId, setVideoId] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('b')
        axios({
            method: 'get',
            url: '/api/top10plays',
            headers: {
                'auth-token': token
            }
        })
        .then(data => setVideoId(data.data.data.videoId))
        .catch(err => console.log(err))
    }, [])
    
    const changeComponent = (e) => {
        let component = e.target.attributes.getNamedItem('data-name').value
        setActiveComponent(component)
    }
    const handleLogout = () => {
        localStorage.removeItem('b')
        props.history.push('/')
    }
    useEffect(() => {
        String.prototype.toHHMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return minutes + ':' + seconds;
        }
        console.log("5678".toHHMMSS());
        console.log('fetching data')
        let token = jwt.decode(localStorage.getItem('b'))
        setName(token.name)
        let tokenWillExpireInSeconds = (token.exp - Math.round(+new Date()/1000))
        var timeleft = tokenWillExpireInSeconds

        var downloadTimer = setInterval(function(){
          document.getElementById("countdown").innerHTML = timeleft.toString().toHHMMSS()
          timeleft -= 1;
          if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished"
            location.reload()
          }
        }, 1000);
    return () => {
        clearInterval(downloadTimer)
    }
    }, [])
    return(
        <div className="appPage">
            <nav className="appPage__NavigationContainer">
                <h3>Welcome, {name}</h3>
                <div className="appPage__LogoAndLogout">
                    <h1>NBA</h1>
                    <div className="navContainer__LogoutButton" onClick={handleLogout}>
                        <SvgIcon icon={"logout"} />
                        <span>Logout</span>
                    </div>
                    
                </div>
                <div className="appPage__NavigationList">
                    <span data-name="scores" onClick={changeComponent} className={activeComponent === 'scores' && "active"}>Scores </span> / <span data-name="standings" onClick={changeComponent} className={activeComponent === 'standings' && "active"}> Standings </span> / <span data-name="top10" onClick={changeComponent} className={activeComponent === 'top10' && "active"}>Top10</span>
                </div>
                

            </nav>
            {activeComponent === 'scores' && <Scores />}
            {activeComponent === 'standings' && <Standings />}
            {activeComponent === 'top10' && <TopPlays videoId={videoId}/>}
            <br/>
            <br/>
            <footer>
                <span>Made by Rafal</span>
                <span id="countdown"></span>
            </footer>
        </div>
    )
}

export default App  