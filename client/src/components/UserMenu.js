import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const UserMenu = () => {
  return (
    <>
      <div className="text-center p-4 m-4">
        <ul className="menu bg-base-200 w-56 rounded-box">
          <h4 className="text-lg mb-4 font-bold">Dashboard</h4>
          <li>
            <a>
              <FaUser size={18} />
              <NavLink className={"font-bold"} to="/dashboard/user/profile">
                Profile
              </NavLink>
            </a>
          </li>
          <li>
            <a>
              <BsFillBagCheckFill size={18} />
              <NavLink className={"font-bold"} to="/dashboard/user/orders">
                Orders
              </NavLink>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
