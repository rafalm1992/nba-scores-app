import React , {useState, useEffect} from 'react'
import axios from 'axios'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'


const TopPlays = (props) => {
        let url = `//www.youtube.com/embed/${props.videoId}?rel=0&amp;controls=1&amp;showinfo=1&amp;cc_lang_pref=lt&amp;cc_load_policy=1`
        console.log(props)
    return(
        <div className="topPlaysContainer">
            <h1 className="container__title">Top10 Plays</h1>
            {!props.videoId ? <LoadingSpinner /> :
            <iframe width="350" height="197" src={url} frameBorder="0" allowFullScreen></iframe>
            }
        </div>
    )
}

export default TopPlays