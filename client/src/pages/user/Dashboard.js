import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <UserMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1>Name : {auth?.user?.name}</h1>
          <h1>Email : {auth?.user?.email}</h1>
          <h1>Address : {auth?.user?.address}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
