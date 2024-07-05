import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomTable from "../../components/CustomTable";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";

const Course = () => {
  // State
  const [name, setName] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [department, setDepartment] = React.useState("");

  //
  const handleAdd = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <div className="p-5 m-5 flex flex-col custom-shadow rounded-2xl w-full h-screen">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <CustomInput label={"Course Name"} />
        <CustomDropdown label={"Semester"} />
        <CustomDropdown label={"Degree"} />
        <CustomDropdown label={"Department"} />
        <CustomButton label={"Add"} onClick={handleAdd} />
      </div>
      <hr className=" py-5 mt-10" />
      <CustomTable
        // data={data?.data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Course;
