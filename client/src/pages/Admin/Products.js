import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // get total count product
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <Layout title={"Products Dashboard - ShopNill Store"}>
      <div className="grid grid-cols-4 ">
        <div className="">
          <AdminMenu />
        </div>
        <div>
          <h1 className="text-center text-xl font-bold mt-8 mb-8">
            All Products List
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-64 lg:ml-[100px] mt-7">
            {products.map((p) => (
              <Link
                to={`/dashboard/admin/product/${p?.slug}`}
                className="card w-52 bg-base-100 shadow-xl"
              >
                <figure className="px-10 pt-10">
                  <img
                    className="rounded-xl h-28 w-28"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                    alt={p.name}
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className=" text-md">{p.name}</h2>
                  <p className="font-bold">$ {p?.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="m-2 p-3 text-center">
        {products &&
          products.length < total &&
          (loading ? (
            <span className="loading loading-ball loading-lg text-center"></span>
          ) : (
            <button
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {/* {loading ? "Loading......" : "Loadmore"} */}
              loadmore
            </button>
          ))}
      </div>
    </Layout>
  );
};

export default Products;
