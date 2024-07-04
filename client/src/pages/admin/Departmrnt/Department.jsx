import React from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
} from "../../../Redux/api/departmentApi";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import CustomTable from "../../../components/CustomTable";

const Department = () => {
  const [departmentId, setDepartmentId] = React.useState("");
  const [departmentName, setDepartmentName] = React.useState("");

  // redux
  const [createDepartment] = useCreateDepartmentMutation();
  const [deleteDepartmentById] = useDeleteDepartmentMutation();
  const { data, refetch } = useGetDepartmentQuery();

  const handleAdd = async () => {
    try {
      const addResponse = await createDepartment({
        departmentId,
        departmentName,
      }).unwrap();
      console.log(addResponse, "addResponse");
      refetch();
      setDepartmentId(""); // Reset the input fields
      setDepartmentName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {};
  const handleDelete = async (id) => {
    console.log(id, "id");
    try {
      const deleteResponse = await deleteDepartmentById({ id }).unwrap();
      console.log(deleteResponse, "deleteResponse");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 m-5 flex flex-col custom-shadow rounded-2xl w-full">
      <div className="space-x-4 flex">
        <CustomInput
          label={"Department Id"}
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        />
        <CustomInput
          label={"Department Name"}
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <CustomButton label={"Add"} onClick={handleAdd} />
      </div>
      <hr className=" py-5 mt-10" />
      <CustomTable
        data={data?.data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Department;
