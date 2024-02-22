import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - ShopNill Store"}>
      <h1 className="text-2xl text-center font-bold mt-4 mb-5">
        All Categories
      </h1>
      <div className="grid grid-cols-5 gap-4 justify-center items-center p-5">
        {categories.map((cat) => (
          <div className="">
            <div className="border-2 border-sky-500 bg-sky-600 h-28 w-34 rounded-xl  flex items-center justify-center cursor-pointer hover:bg-slate-100  hover:text-sky-500 hover:font-bold">
              <Link to={`/category/${cat?.slug}`}>{cat?.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
