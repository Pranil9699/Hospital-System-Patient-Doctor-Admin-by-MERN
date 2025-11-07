import React from "react";

const StatCard = ({ title, count }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-700 mt-2">{count}</p>
    </div>
  );
};

export default StatCard;
