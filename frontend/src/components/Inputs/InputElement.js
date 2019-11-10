import React from "react";
import SvgIcon from "../Icons/SvgIcon";
import './inputElement.scss'

const InputElement = props => {
  let styleClass;
  if (props.error) {
    styleClass = "inputElement inputElement--error";
  } else {
    styleClass = "inputElement";
  }
  return (
    <div>
    <div className={styleClass}>
      <SvgIcon className={"svgIcon"} icon={props.icon} error={props.error}/>
      <input
        pattern={props.pattern}
        minLength={props.minLength}
        required={props.required}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
    {props.errorMessage && <span className="inputElementErrorMessage">{props.errorMessage}</span>}
    </div>
  );
};

export default InputElement;
