import React from "react";
import { NavLink } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiShieldPlusFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center active p-4 m-4">
        <ul className="menu bg-base-200 active w-56 rounded-box">
          <h4 className="text-lg mb-4 font-bold">Admin Panel</h4>
          <li>
            <a>
              <BiSolidCategoryAlt size={18} />
              <NavLink
                className={"font-bold"}
                to="/dashboard/admin/create-category"
              >
                Create Category
              </NavLink>
            </a>
          </li>
          <li>
            <a>
              <PiShieldPlusFill size={18} />
              <NavLink
                className={"font-bold"}
                to="/dashboard/admin/create-product"
              >
                Create Product
              </NavLink>
            </a>
          </li>
          <li>
            <a>
              <FaProductHunt size={18} />
              <NavLink className={"font-bold"} to="/dashboard/admin/products">
                Products
              </NavLink>
            </a>
          </li>
          <li>
            <a>
              <FaProductHunt size={18} />
              <NavLink className={"font-bold"} to="/dashboard/admin/orders">
                Orders
              </NavLink>
            </a>
          </li>
          <li>
            <a>
              <FaUsers size={18} />
              <NavLink
                className={"font-bold active:bg-blue-600"}
                to="/dashboard/admin/users"
              >
                Users
              </NavLink>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
