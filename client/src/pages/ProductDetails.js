import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaCartPlus, FaEye, FaHome, FaStar } from "react-icons/fa";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { BsStarHalf } from "react-icons/bs";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductDetails();
  }, [params?.slug]);

  // get product details
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);

  const handleIncrement = () => {
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
      setPrice(product?.price * (count + 1));
    }
  };
  const handleDercrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      setPrice(price - product.price);
    }
  };

  return (
    <Layout title={"Product Details - ShopNill Store"}>
      <div className="text-sm breadcrumbs bg-indigo-200 w-full h-9">
        <ul>
          <li>
            <a>
              <FaHome />
              Home
            </a>
          </li>
          <li>
            <a>Products</a>
          </li>
          <li>
            <span className="inline-flex gap-2 items-center">
              Products-Details
            </span>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-6 mt-5 sm:flex-col-reverse xs:flex-col-reverse ">
        <div className="col-span-2 flex justify-center items-center">
          <img
            className="rounded-xl text-center mt-[-20px]"
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
            alt={product?.name}
          />
        </div>
        <div className="col-span-2 ml-3">
          <h1 className="text-xl mb-3 font-bold text-center">
            Product Details
          </h1>

          <h4 className="text-sm">
            <span className="font-normal">Code: </span>{" "}
            <span className="opacity-65">{product?._id}</span>
          </h4>
          <h4 className="text-sm">
            <span className="font-normal">Availability: </span>{" "}
            <span className="opacity-65">In Stock</span>
          </h4>

          <h4 className="text-lg">
            <span className="font-semibold">{product?.name}</span>
          </h4>
          <h4 className="text-2xl">
            <span className="font-semibold text-indigo-600">
              {" "}
              $ {product?.price}
            </span>{" "}
          </h4>
          <h4 className="text-sm flex items-center gap-4">
            <span className="font-normal flex text-yellow-400">
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStarHalf />
              <IoMdStarOutline className="text-gray-300" />
            </span>{" "}
            <span className="opacity-65">10 Reviews</span>
          </h4>
          <div className="cart flex mt-5">
            <button
              className="btn btn-primary rounded-l-none mt-2 w-full block"
              onClick={() => {
                setCart([...cart, product, price]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Product Added To Cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
          <p className="mt-3">
            Vendor: <span className="opacity-65">PayFax</span>
          </p>
          <p>
            Product Type: <span className="opacity-65">Online</span>
          </p>
          <p className="font-semibold mt-4">
            Description
            <span className="opacity-65 text-sm">
              <br />
              We are proud to present our best premium store ShopNill. This is
              multi-purpose software that can be used for any type of the store.
              Great variety of available options will make customization process
              very easy. Please, take a look at feature list and compare with
              our competitors. You can buy our theme and start your business
              online with minimal time investments. Wokiee support DropShipping
              app Oberlo. Wokiee Shopify theme is powerfool tool to create
              personal webshop.
            </span>
          </p>
        </div>
      </div>
      <div className="row">
        <h1 className="text-xl font-bold text-decoration-underline ml-3 mt-4 mb-3">
          Similar Products
        </h1>
        {relatedProducts.length < 1 && (
          <p className="font-semibold text-center mt-3">
            No Similar Product Found.!
          </p>
        )}
        <div className="flex flex-wrap cursor-pointer  mb-3">
          {relatedProducts?.map((p) => (
            <div
              onClick={() => navigate(`/product/${p?.slug}`)}
              key={p?._id}
              className="  h-[340px] w-64 mt-6  cursor-pointer hover:border-indigo-600"
            >
              <figure className="px-10 pt-10">
                <img
                  className="h-56 w-60 mt-[-40px]"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                  alt={p?.name}
                />
              </figure>
              <div className="card-body ml-2 w-58">
                <h2 className="card-title text-sm mt-[-25px]">{p?.name}</h2>
                <p className="text-xs">
                  {p?.description.length >= 20
                    ? p?.description.slice(0, 23) + "..."
                    : p?.description}
                </p>
                <p className="text-xs flex justify-between">
                  <b>$ {p?.price}</b>
                  <div className="flex">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <BsStarHalf className="text-yellow-400" />
                  </div>
                </p>

                <div className="flex justify-center items-center gap-1 bottom-1">
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => navigate(`/product/${p?.slug}`)}
                  >
                    <FaEye />
                  </button>
                  <button className="btn btn-primary btn-xs">
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

export default ProductDetails;
