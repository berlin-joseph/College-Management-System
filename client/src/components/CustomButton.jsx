import React from "react";

const CustomButton = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border py-2.5 border-gray-200 w-72 rounded-md flex justify-center hover:cursor-pointer"
    >
      <button>{label}</button>
    </div>
  );
};

export default CustomButton;
