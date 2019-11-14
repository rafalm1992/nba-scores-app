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
                console.log(res.data.data.title)
                setVideoUrl(res.data.data.url)
                setVideoTitle(res.data.data.title)  
                setVideoImage(res.data.data.image)
            })
            .catch(err => {
                console.log('top plays catch err', err)
                location.reload();
            })
        return () => {
            null
        };
    }, [])

    return(
        <div className="topPlaysContainer">
            <h1 className="container__title">Top10 Plays</h1>
            {!videoUrl ? <div className="spinner"></div> :
            <div className="topPlays">
                <a href={videoUrl} target="_blank"><img src={videoImage}/></a>
                <h3><a href={videoUrl} target="_blank">{videoTitle}</a></h3>
            </div>
            }
            <iframe width="350" height="197" src="//www.youtube.com/embed/JH0miu8yLtE?rel=0&amp;controls=1&amp;showinfo=1&amp;cc_lang_pref=lt&amp;cc_load_policy=1" frameborder="0" allowFullScreen></iframe>
          </div>
    )
}

export default TopPlays