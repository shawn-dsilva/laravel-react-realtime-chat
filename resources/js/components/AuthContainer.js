import React from "react";


export const AuthContainer = (props) => {
    return (
      <div className="authcontainer">
        <h1>Laravel React RealTime Chat App</h1>
        <div className="cardcontainer">        
          {props.children}
        </div>
        <h2>Made by Shawn D'silva </h2>
      </div>
    );
  }

export default AuthContainer;