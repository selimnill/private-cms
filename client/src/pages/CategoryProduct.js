import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  const params = useParams();
  const navigate = useNavigate();
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  });

  return (
    <Layout title={"Category Product - ShopNill Store"}>
      <div className="text-center mt-6">
        <h1 className="text-lg">
          <span className="font-semibold">Category Name : </span>
          {category?.name}
        </h1>
        <h3 className="text-base ">
          <span className="font-bold text-indigo-700 text-lg">
            {products?.length}
          </span>{" "}
          result Found{" "}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div className="border-2 rounded ml-2 border-indigo-600 h-64 w-52 mt-6">
              <figure className="px-10 pt-10">
                <img
                  className="rounded-xl h-28 w-28 text-center mt-[-20px]"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                  alt={p.name}
                />
              </figure>
              <div className="card-body ml-2 w-58">
                <h2
                  className="card-title text-xs mt-[-25px]"
                  onClick={() => navigate(`/product/${p?.slug}`)}
                >
                  {p.name}
                </h2>
                <p className="text-xs mt-[-5px]">
                  {p?.description.length >= 20
                    ? p?.description.slice(0, 23) + "..."
                    : p?.description}
                </p>
                <p className="text-xs flex justify-between">
                  <b>$ {p?.price}</b>
                  <div className="flex text-base">
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStarHalf className="text-yellow-400" />
                  </div>
                </p>
                <div className="flex justify-center items-center gap-1 bottom-1">
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => navigate(`/product/${p?.slug}`)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Product Added To Cart");
                    }}
                  >
                    <FaCartPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
