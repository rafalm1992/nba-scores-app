import React, {useState, useEffect} from 'react'
import InputElement from '../../Inputs/InputElement'
import ButtonElement from '../../Buttons/ButtonElement'

import axios from 'axios'

const RegisterForm = (props) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState({email:false, password:false, name: false})
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [registrationCompleted, setRegistrationCompleted] = useState(false)

    useEffect(()=>{
        setEmail('')
        setPassword('')
        setName('')
    }, [])  

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmiting(true)
        if(email === "" || password === "" || name === "" || !validateEmail(email)){
            console.log('smosss')
            setErrorMessage({name: !e.target.elements[0].value && "Name can't be empty", email: !e.target.elements[1].value ? "Email can't be empty" : !validateEmail(email) ? 'Email is not valid' : null , password: !e.target.elements[2].value && "Password can't be empty"} )
            setIsSubmiting(false)
            return
        }
        setErrorMessage({all: null}) 


        axios({
            method: "post",
            url: "/api/user/register",
            data: {
              email: email,
              name: name,
              password: password
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then((data) => {
                console.log(data, 'data')
              setEmail("");
              setPassword("");
              setName("");
              console.log(props)
              setIsSubmiting(false)
              setRegistrationCompleted(true)
              
            
            })
            .catch(err => {
               [500, 501, 502, 503, 504, 505].includes(err.response.status) && setErrorMessage({all: "Server error, try later..."})
               setIsSubmiting(false)
               console.log(err.response)
               err.response.status === 400 && setErrorMessage({all: err.response.data})
            });
    }
    return(
    <div className="registrationForm">
        {registrationCompleted ? <h3 style={{marginTop:50, width:360}}>Registration was successful</h3> : 
       (<form id="register" onSubmit={handleSubmit}>
            <InputElement errorMessage={errorMessage.name} type="text" name="name"  icon={'username'} placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value); setErrorMessage(Object.assign({},errorMessage,{name: null}))}}/>
            <InputElement errorMessage={errorMessage.email} type="email" name="email" icon={'email'} placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value); setErrorMessage(Object.assign({},errorMessage,{email: null}))}}/>
            <InputElement errorMessage={errorMessage.password} type="password" name="password" icon={'password'} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value); setErrorMessage(Object.assign({},errorMessage,{password: null}))}}/>
            {errorMessage.all && <div className="loginFormError"><span>{errorMessage.all}</span></div>}
            <ButtonElement disabled={isSubmiting} value={'Sign up'}/>
       </form> )}
        <p className="registrationForm_BottomText"><span onClick={()=>props.changeComponent('login')}>Back to Login</span></p>
    </div>
    )
}
export default RegisterForm