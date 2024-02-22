import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import emptyCart from "../../src/assets/cartoon/empty cart.png";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // delete cart product
  const handleRemove = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item?.price * item?.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        const updatedQuantity =
          item.quantity < 10 ? item.quantity + 1 : item.quantity;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        const updatedQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeDuplicates = () => {
    const uniqueCart = cart.reduce((acc, current) => {
      const x = acc.find((item) => item._id === current._id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setCart(uniqueCart);
    localStorage.setItem("cart", JSON.stringify(uniqueCart));
  };

  useEffect(() => {
    removeDuplicates(); // Call removeDuplicates function when cart changes
  }, [cart]);

  return (
    <Layout title={"Cart - ShopNill Store"}>
      <div>
        <div className="text-sm breadcrumbs bg-indigo-200 w-full h-9">
          <ul>
            <li>
              <a>
                <FaHome />
                Home
              </a>
            </li>
            <li>
              <a>Products Cart</a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-3 mt-5 m-3 p-3">
          <div className="col-span-2 p-3">
            <div className="mt-2">
              <h4 className="text-center mt-3 font-semibold">
                {cart?.length ? (
                  `You have ${cart?.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                ) : (
                  <>
                    <h1 className="text-center text-xl font-bold">{`Hello Mr. ${
                      auth?.token && auth?.user?.name
                    }`}</h1>
                    <span>Your Cart is Empty</span>
                    <div>
                      <img src={emptyCart} alt="empty cart" />
                    </div>
                  </>
                )}
              </h4>
            </div>
            {cart?.map((p) => (
              <div
                className="flex justify-around items-center border-2 border-indigo-500 rounded p-3"
                key={p?._id}
              >
                <div>
                  <img
                    className="rounded-xl h-28 w-28 text-center]"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="flex justify-center items-center w-36 bg-gray-300 opacity-80 rounded text-xl cursor-pointer gap-4 p-3 font-bold rounded-r-none h-12 mt-2">
                  <span
                    className="minus text-4xl"
                    onClick={() => handleDecrement(p._id)}
                  >
                    -
                  </span>
                  <span className="num text-2xl">{p.quantity}</span>
                  <span
                    className="plus text-3xl"
                    onClick={() => handleIncrement(p._id)}
                  >
                    +
                  </span>
                </div>
                <div className="flex-none">
                  <h4 className="text-md font-semibold">{p?.name}</h4>
                  <h4 className="font-bold text-indigo-500">
                    $ {p?.price * p?.quantity}
                  </h4>
                </div>
                <div className="delte-button">
                  <button
                    className=" text-red-600 font-semibold"
                    onClick={() => handleRemove(p?._id)}
                  >
                    <MdDelete size={25} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center border-l-4 border-indigo-600 p-3">
            <h4 className="font-bold text-lg">Cart Summary</h4>
            <p className="font-semibold">Total | CheckOut | Payment</p>
            <hr className=" mt-1" />
            <h3 className="text-lg mt-4 font-semibold">
              Total :{" "}
              <span className="font-bold text-indigo-700">{totalPrice()}</span>{" "}
            </h3>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5 className="font-semibold uppercase">
                    {auth?.user?.address}
                  </h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3 mt-4">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart", // if try to login from cart page. after login user will be redirect to cart page
                      })
                    }
                  >
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2 ">
              <div id="dropin-container">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn bg-green-700 text-white"
                      onClick={handlePayment}
                      disabled={!instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
