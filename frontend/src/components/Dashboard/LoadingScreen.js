import React, {useEffect, useRef} from "react";

const LoadingScreen = () => {
  const loadingElement = useRef(null);
  useEffect(() => {
    loadingElement.current.classList.add("visible");
    return () => {
      loadingElement.current.classList.add("invisible");   
    } 
  }, []);
  return (
    <div className="loadingscreen" ref={loadingElement}>
        <h1>Loading...</h1>
    </div>
  );
};

export default LoadingScreen;
