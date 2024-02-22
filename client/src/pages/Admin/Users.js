import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Users Dashboard - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <AdminMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1>All Users</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
