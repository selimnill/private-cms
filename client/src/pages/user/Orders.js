import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Orders - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <UserMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1 className="tect-center font-bold">All Orders</h1>
          {orders?.map((order, i) => {
            const { status, buyer, payment, products, createAt } = order;
            return (
              <div className="border shadow">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row */}
                      <tr className="font-bold">
                        <th>{i + 1}</th>
                        <td>{status}</td>
                        <td>{buyer?.name}</td>
                        <td>{moment(createAt).fromNow()}</td>
                        <td>
                          {payment.success ? (
                            <span className="text-green-500">Success</span>
                          ) : (
                            <span className="text-red-500">Failed</span>
                          )}
                        </td>
                        <td>{products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.products?.map((p, i) => (
                      <div
                        className="flex justify-around items-center border m-3 p-4"
                        key={p?._id}
                      >
                        <div>
                          <img
                            className="rounded-xl h-28 w-28 text-center mt-[-20px]"
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                            alt={p.name}
                          />
                        </div>
                        <div className="flex-none">
                          <h4 className="text-md">{p?.name}</h4>
                          {/* <p>{p?.description.substring(9, 30)}</p> */}
                          <h4 className="font-bold"> $ {p?.price}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
