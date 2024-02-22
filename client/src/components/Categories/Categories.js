// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   // get all categories
//   const allCategories = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/category/all-category`
//       );
//       if (data?.success) {
//         setCategories(data?.categories);
//         console.log("category from categories", data?.categories);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     allCategories();
//   }, []);

//   return (
//     <div className="grid grid-cols-5">
//       {categories?.map((category) => (
//         <div className="h-12 w-20 rounded">{category?.name}</div>
//       ))}
//     </div>
//   );
// };

// export default Categories;
