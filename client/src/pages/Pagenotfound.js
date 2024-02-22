import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import page404 from "../assets/cartoon/pageNotFound.png";

const Pagenotfound = () => {
  return (
    <Layout title={"404 Page Not Found.!"}>
      <div className="pnf">
        <img src={page404} alt="page not found.!" />
        <Link
          to="/"
          className="border-2 border-indigo-600 p-3 hover:bg-indigo-600 hover:text-white text-indigo-600 font-bold rounded mb-3"
        >
          Go Back Home
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
