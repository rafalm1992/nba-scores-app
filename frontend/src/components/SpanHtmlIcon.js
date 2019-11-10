import React from "react";

const SpanHtmlIcon = props => {
  switch (props.icon) {
    case "arrowUp":
      return <span className={props.className}>&uarr;</span>;
    case "arrowDown":
      return <span className={props.className}>&darr;</span>;
    default:
      return null;
  }
};

export default SpanHtmlIcon;
