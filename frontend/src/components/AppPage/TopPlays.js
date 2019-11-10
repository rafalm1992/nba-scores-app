import React , {useState, useEffect} from 'react'


const TopPlays = (props) => {

    return(
        <div className="topPlaysContainer">
            {!props.videoUrl ? <h1>Loading</h1> :
            <div className="topPlays">
                <h1>Top10 Plays</h1>
                <a href={props.videoUrl} target="_blank"><img src={props.videoImage}/></a>
                <h3><a href={props.videoUrl} target="_blank">{props.videoTitle}</a></h3>
            </div>
            }
        </div>
    )
}

export default TopPlays