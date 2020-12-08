import React from "react";


export const AuthContainer = (props) => {
    return (
      <div className="authcontainer">
        {props.children}
      </div>
    );
  }

export default AuthContainer;