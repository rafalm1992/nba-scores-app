import React from 'react'
import './buttonElement.scss'

const ButtonElement = (props) => {
    let className
    if(props.disabled){
        className="buttonElement--disabled"
    } else {
        className="buttonElement"
    }
    return(
        <button disabled={props.disabled} className={className} onClick={props.onClick}>{props.value}</button>
    )
}

export default ButtonElement