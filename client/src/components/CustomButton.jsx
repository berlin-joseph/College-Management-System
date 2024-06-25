import React from "react";

const CustomButton = ({ label, onClick }) => {
  return (
    <div className="border border-gray-200 px-5 py-2 rounded-md">
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default CustomButton;
