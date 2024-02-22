import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0)
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);

  return (
    <div className="flex justify-center flex-col items-center mb-3 min-h-[500px]">
      <h2 className="text-3xl font-semibold">
        <span className="text-center ml-6 font-bold text-red-600">
          Permission Denied{" "}
        </span>
        <br />
        Redirecting in <span className="text-blue-800 font-bold">
          {count}
        </span>{" "}
        second
      </h2>
      <span className="loading loading-ring loading-lg mt-5"></span>
    </div>
  );
};

export default Spinner;
