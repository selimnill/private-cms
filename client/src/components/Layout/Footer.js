import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="foter text-white bg-black p-3">
      <h4 className="text-center text-white">
        All Right Reserved <b>Selim-Nill</b>
      </h4>
      <p className="text-center mt-3">
        | <Link to={"/about"}>About</Link> |{" "}
        <Link to={"/contact"}>Contact</Link> |{" "}
        <Link to={"/policy"}>Policy</Link> |
      </p>
    </div>
  );
};

export default Footer;
