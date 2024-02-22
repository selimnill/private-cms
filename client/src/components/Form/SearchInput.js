import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";

const SearchInput = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center lg:w-full"
    >
      <input
        type="text"
        placeholder="Search Products..."
        className="input input-bordered rounded-none rounded-l-lg w-24 md:w-auto lg:w-96"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button
        type="submit"
        className="btn btn-primary rounded-none rounded-r-lg"
      >
        <ImSearch className="" size={25} />
      </button>
    </form>
  );
};

export default SearchInput;
