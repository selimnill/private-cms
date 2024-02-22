import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { MdShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("LogOut SuccessfullY.!");
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 sticky-top max-w-full ">
        <div className=" ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost  lg:hidden md:hidden sm:hidden xs:hidden hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu 3menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72 "
            >
              <li>
                {/* <NavLink to={"/"}>Home</NavLink> */}
                <NavLink to={"/"}>
                  <AiFillHome size={20} />
                </NavLink>
              </li>
              <li>
                <details>
                  <summary>
                    <BiSolidCategoryAlt size={20} />
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none w-64">
                    {categories?.map((cat) => (
                      <li key={cat?._id}>
                        <NavLink to={"/categories"}>{cat?.name}</NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              {/* <SearchInput className="w-52 border-gray-400" /> */}
              {!auth.user ? (
                <>
                  <li>
                    <details>
                      <summary>
                        <FaUser size={20} />
                      </summary>
                      <ul className="p-2 bg-base-100 rounded-t-none">
                        <li>
                          <NavLink to={"/register"}>Register</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/login"}>Login</NavLink>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <details>
                      <summary>
                        <FaUser />
                      </summary>
                      <ul className="p-2 bg-base-100 rounded-t-none">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogOut}
                            to={"/login"}
                            className={"ml-4"}
                          >
                            LogOut
                          </NavLink>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              )}
              <li>
                {/* <NavLink to={"/cart"}>Cart(0)</NavLink> */}
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    {cart?.length}
                  </span>
                  <NavLink to="/cart">
                    <MdShoppingCart size={23} className="text-black" />
                  </NavLink>
                </div>
              </li>
              <li>
                <label className="flex cursor-pointer gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
          <NavLink
            to={"/"}
            className="btn btn-ghost text-xl tracking-widest border-none hover:none  "
          >
            <BsFillHandbagFill className="text-blue-800 hover:bg-orange-600 dark:text-white dark:bg-white" />{" "}
            ShopNill
          </NavLink>
        </div>

        <div className=" justify-center  lg:flex text-center ">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <NavLink to={"/"}>
                <AiFillHome className="bg-transparent" size={20} />
              </NavLink>
            </li>
            <li>
              <details>
                <summary>
                  <Link to={"/categories"}>
                    <BiSolidCategoryAlt size={20} />
                  </Link>
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none w-64">
                  {categories?.map((cat) => (
                    <li key={cat?._id}>
                      <NavLink to={"/categories"}>{cat?.name}</NavLink>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <details>
                    <summary>
                      <FaUser size={18} />
                    </summary>
                    <ul className="p-2 bg-base-100 rounded-t-none">
                      <li>
                        <NavLink to={"/register"}>Register</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/login"}>Login</NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            ) : (
              <>
                <li>
                  <details>
                    <summary>{auth?.user?.name}</summary>
                    <ul className="p-2 bg-base-100 rounded-t-none">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogOut}
                          to={"/login"}
                          className={"ml-4"}
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            )}
            <li>
              {/* <NavLink to={"/cart"}>Cart({cart?.length})</NavLink> */}
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">
                  {cart?.length}
                </span>
                <NavLink to="/cart">
                  <MdShoppingCart size={22} className="text-black" />
                </NavLink>
              </div>
            </li>
            <li>
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" onChange={handleToggle} />

                {/* sun icon */}
                <svg
                  className="swap-on fill-current w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-off fill-current w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
