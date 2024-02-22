import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard - ShopNill Store"}>
      <div className="grid grid-cols-2 ">
        <div className="">
          <AdminMenu />
        </div>
        <div className="ml-[-130px] mt-4">
          <div className=" w-75 p-3">
            <h1 className="text-lg">Admin Name : {auth?.user?.name}</h1>
            <h1 className="text-lg">Admin Email : {auth?.user?.email}</h1>
            <h1 className="text-lg">Admin Contact : {auth?.user?.contact}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
