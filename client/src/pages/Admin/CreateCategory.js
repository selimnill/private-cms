import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryFrom from "../../components/Form/CategoryFrom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        allCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

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
      toast.error("Something went wrong to getting category");
    }
  };

  useEffect(() => {
    allCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected?._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpenModal(false);
        allCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // delete category
  const handleDelete = async (pid, name) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${name} is deleted`);
        allCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Create Category admin - ShopNill Store"}>
      <div className="grid grid-cols-2">
        <div className="">
          <AdminMenu />
        </div>
        <div className="ml-[-130px] mt-10">
          <h1 className="text-center mb-4 font-bold">Manage Category</h1>
          <div className="p-3">
            <CategoryFrom
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row  */}
                  {categories?.map((category) => (
                    <>
                      <tr>
                        <td key={category._id}>{category?.name}</td>
                        <td>
                          <label
                            htmlFor="edit_button"
                            className="btn btn-primary w-20 font-semibold"
                            onClick={() => {
                              setUpdatedName(category?.name);
                              setSelected(category);
                              setOpenModal(true);
                            }}
                          >
                            Edit
                          </label>
                          <button
                            onClick={() => {
                              handleDelete(category?._id, category?.name);
                            }}
                            className="btn bg-red-700 hover:bg-red-800 ml-2 font-semibold text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <input type="checkbox" id="edit_button" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <CategoryFrom
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
            setOpenModal={setOpenModal}
          />
          <div className="modal-action">
            <label htmlFor="edit_button" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
