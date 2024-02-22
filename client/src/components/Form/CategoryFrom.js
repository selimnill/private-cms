import React, { useState } from "react";

const CategoryFrom = ({ handleSubmit, value, setValue, setOpenModal }) => {
  return (
    <>
      <div className="hero  bg-base-200">
        <div className="hero-content ">
          <div className="text-center"></div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control outline-none">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter new category"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-700 text-white font-bold hover:bg-green-800 outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFrom;
