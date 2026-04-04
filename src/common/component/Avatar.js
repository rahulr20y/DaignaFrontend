import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";
/* props :{
    src
    optional
    size
    style
    userId
    onclick
} */

function Avatar(props) {
  const location = useLocation();
  return (
    <img
      src={props.src}
      alt="User Avatar"
      className={classnames(
        "img-fluid rounded",
        props.className ? props.className : " ",
        props.size !== undefined ? "thumb-" + props.size : "thumb-sm"
      )}
      // not required when routing
      onClick={
        props.onclick
          ? props.onclick
          : () => {
              window.history.replaceState(
                "",
                "IndiaConnects",
                "app/profile/" + props.userId + "?tab=" + "post"
              );
            }
      }
      style={props.style !== undefined ? props.style : {}}
    ></img>
  );
}

export default Avatar;
