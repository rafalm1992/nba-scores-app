import React, {useEffect, useRef} from 'react'

const Server = props => {
  const serverElement = useRef(null);
  useEffect(() => {
    serverElement.current.classList.add("visible");
    serverElement.current.classList.remove("visible");
    serverElement.current.classList.remove("invisible");  
  }, []);
  return (
    <div className="server invisible" ref={serverElement}>
      <div className="server__name">{props.name}</div>
      <div className="server__distance">{props.distance + " km"}</div>
    </div>
  );
};

export default Server