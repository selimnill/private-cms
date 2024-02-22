import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact Us - ShopNill Store"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2 font-semibold">
            Any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3 flex items-center">
            <BiMailSend className="mt-1.5 text-xl font-bold" />
            <span className="ml-3 font-semibold">
              {" "}
              : www.help@ecommerceapp.com
            </span>
          </p>
          <p className="mt-3 flex items-center">
            <BiPhoneCall className="mt-1.5 text-xl font-bold" />{" "}
            <span className="ml-3 font-semibold">: 012-3456789</span>
          </p>
          <p className="mt-3 flex items-center">
            <BiSupport className="mt-1.5 text-xl font-bold" />
            <span className="ml-3 font-semibold">
              {" "}
              : 1800-0000-0000 (toll free)
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
