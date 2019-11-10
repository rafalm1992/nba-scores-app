import React from 'react'
import './buttonElement.scss'

const ButtonElement = (props) => {
    return(
        <button className="buttonElement" onClick={props.onClick}>{props.value}</button>
    )
}

export default ButtonElement