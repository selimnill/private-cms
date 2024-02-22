import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import useCategory from "../hooks/useCategory";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1 className="mt-4 text-lg font-semibold">Search Results</h1>
          <h6>
            {values?.results?.length < 1 ? (
              "No Products Found"
            ) : (
              <>
                Found :{" "}
                <span className="text-bold">{values?.results?.length}</span>
              </>
            )}
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {values &&
              values?.results?.map((p) => (
                <div className="border border-3 rounded ml- h-64 w-52 mt-6">
                  <figure className="px-10 pt-10">
                    <img
                      onClick={() => navigate(`/product/values?.slug`)}
                      className="rounded-xl h-28 w-28 text-center mt-[-20px] cursor-pointer"
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
      </div>
    </Layout>
  );
};

export default Search;
