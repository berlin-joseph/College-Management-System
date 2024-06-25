import React, { useState } from "react";

const CustomDropdown = () => {
  return (
    <div>
      <select>
        <option value="" disabled>
          Select an option
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  );
};

export default CustomDropdown;
