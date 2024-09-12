import React from "react";
import memeFace from "../assets/images.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img className="header-img" src={memeFace} />
      <h2 className="header-title">Meme Generator</h2>
      <h4 className="header-project">Scrimba React Course - Meme Generator </h4>
    </header>
  );
}
