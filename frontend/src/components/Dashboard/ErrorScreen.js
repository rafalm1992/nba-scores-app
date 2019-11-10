import React, {useEffect, useRef} from "react";

const ErrorScreen = props => {

  const errorElement = useRef(null);

  useEffect(() => {
    errorElement.current.classList.add("visible");
    return () => {
      errorElement.current.classList.add("invisible");    
    }
  }, []);

  return (
    <div className={props.className} ref={errorElement}>
        <h1>
        Sorry! Server is unavailable at the moment... 
        <br />
        <br />
        Click <a href='#'onClick={props.refreshComponen}>here</a> to try again
        </h1>
    </div>
  );
};

export default ErrorScreen;
