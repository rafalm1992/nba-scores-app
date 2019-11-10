import React , {useState, useEffect} from 'react'
import axios from 'axios'


const TopPlays = (props) => {
    const [videoUrl, setVideoUrl] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [videoImage, setVideoImage] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('b')
        console.log('use effect ', token)
        axios({
            method: 'get',
            url:'/api/top10plays',
            headers: {
                'auth-token': token
            }
        })
            .then(res => {
                console.log(res)
                setVideoUrl(res.data.url)
                setVideoTitle(res.data.title)  
                setVideoImage(res.data.image)
            })
            .catch(err => {
                console.log('top plays catch err', err)
                //location.reload();
            })
        return () => {
            null
        };
    }, [])

    return(
        <div className="topPlaysContainer">
            {!videoUrl ? <h1>Loading</h1> :
            <div className="topPlays">
                <h1 className="container__title">Top10 Plays</h1>
                <a href={videoUrl} target="_blank"><img src={videoImage}/></a>
                <h3><a href={videoUrl} target="_blank">{videoTitle}</a></h3>
            </div>
            }
        </div>
    )
}

export default TopPlays