import React from "react";

const InputComponent = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      className="p-2 mt-8 rounded-xl border w-full"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComponent;
