import React, {useEffect} from 'react'
import axios from 'axios'

const CheckAuth = (props) => {
    useEffect(()=>{
        console.log('use effect is working')
        if(localStorage.getItem('b')){
            axios({
                method:'post',
                url: '/checkValidation',
                headers: {
                    'auth-token': localStorage.getItem('b')
                }
            })
            .then((res)=>{
                
                if(res.data.status._id && res.data.name === "1a2b3c"){
                    console.log('data name and status id matches')
                    props.history.push('/app')
                }
                else{
                    console.log('status name id didnt match')
                    props.history.push('/login')
                }
            })
            .catch(err => {
                console.log(err, 'some err')
                props.history.push('/login')
            })
        } else {
            console.log('pushing to / because no token found in localstorage')
            props.history.push('/login')
        }
    },[])
    return(
        <div></div>
    )
}

export default CheckAuth