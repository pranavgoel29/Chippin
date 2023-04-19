import React from "react";
import "./Card.css";


const Card = (props) => {
  return (
    <div style={{backgroundColor:`${props.bgcolor}`}} className="card">
      <div className="cardicon">{props.icons}</div>
      <div className="cardtitle">{props.title}</div>
      <div className="carddata">{props.data}</div>
    </div>
  );
}

export default Card;