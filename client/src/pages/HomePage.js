import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import SearchInput from "../components/Form/SearchInput";
import Banner from "../components/Banner/Banner";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import useCategory from "../hooks/useCategory";
import { FaCartPlus, FaEye } from "react-icons/fa";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const category = useCategory();

  // get all categories
  const allCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allCategory();
  }, []);

  // get all product
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

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

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
    <Layout title={"Home - ShopNill Store"} className="dark:bg-black">
      <div className="grid grid-cols-4 ">
        <div className="">
          <div className="flex-col sticky top-24 border-r-2 border-indigo-600">
            <h2 className="text-center font-bold mb-4 mt-4">
              Filter By Category
            </h2>
            <div className="flex flex-col w-full mt-[-30px]">
              <div className="divider divider-primary"></div>
            </div>
            <div className="flex flex-column ml-5 lg:w-64">
              {categories?.map((c) => (
                <Checkbox
                  className="p-1 hover:bg-indigo-700 hover:pl-4 hover:transition-all hover:p-2 hover:ml-4 hover:translate-x-2 hover:text-white hover:rounded"
                  key={c?._id}
                  onChange={(e) => handleFilter(e.target.checked, c?._id)}
                >
                  {c?.name}
                </Checkbox>
              ))}
            </div>
            {/* filter by prices */}
            <h2 className="text-lg font-bold mb-2 text-center mt-3">
              Filter By Prices
            </h2>
            <div className="flex flex-col w-full mt-[-30px]">
              <div className="divider divider-primary"></div>
            </div>
            <div className="flex flex-column ml-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p?._id}>
                    <Radio
                      className="p-1 hover:bg-indigo-700 hover:pl-4 hover:transition-all hover:p-2 hover:ml-4 hover:translate-x-2 hover:text-white hover:rounded"
                      value={p.array}
                    >
                      {p?.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div></div>
            <div className="flex flex-column ml-5">
              <button
                className="btn bg-red-500 hover:bg-red-800 text-white font-semibold mt-3"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3 ml-1">
          <div className="mt-10 max-w-[1024px] mb-10">
            <SearchInput />
          </div>
          <div className="Banner">
            <Banner />
          </div>
          <div className="categories mt-72 grid grid-cols-5 gap-0 cursor-pointer max-w-[1000px] ">
            {category?.map((c) => (
              <>
                <div className="h-24 w-36 text-center p-1 rounded text-indigo-700 hover:bg-indigo-900  font-bold border-2 border-indigo-700 pointer-event bg-white  mt-4 flex justify-center items-center">
                  <Link to={`/category/${c?.slug}`}>
                    <h3 className="text-lg"> {c?.name}</h3>
                  </Link>
                </div>
              </>
            ))}
          </div>
          <h1 className="ml-5 font-bold mb-3 mt-7">Products</h1>
          <div className="flex flex-wrap gap-2 justify-center max-w-[1024px]">
            {products.map((p) => (
              <div className=" h-[340px] w-64 mt-6  cursor-pointer hover:border-indigo-600">
                <figure className="px-10 pt-10 ">
                  <img
                    className=" h-56 w-60 mt-[-40px]"
                    onClick={() => navigate(`/product/${p?.slug}`)}
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
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading......" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
