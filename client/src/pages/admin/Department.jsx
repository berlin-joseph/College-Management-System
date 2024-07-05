import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
} from "../../Redux/api/departmentApi";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import CustomTable from "../../components/CustomTable";
import CustomDropdown from "../../components/CustomDropdown";
import { useGetDegreeQuery } from "../../Redux/api/degreeApi";

const Department = () => {
  const [departmentId, setDepartmentId] = React.useState("");
  const [departmentName, setDepartmentName] = React.useState("");
  const [degree, setDegree] = React.useState("");

  // redux
  const [createDepartment] = useCreateDepartmentMutation();
  const [deleteDepartmentById] = useDeleteDepartmentMutation();
  const { data: degreeData, refetch: refetchDegrees } = useGetDegreeQuery();
  const { data, refetch } = useGetDepartmentQuery();

  const handleAdd = async () => {
    try {
      const addResponse = await createDepartment({
        departmentId,
        departmentName,
        degree,
      }).unwrap();

      refetch();
      setDepartmentId("");
      setDepartmentName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {};
  const handleDelete = async (id) => {
    try {
      const deleteResponse = await deleteDepartmentById({ id }).unwrap();

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 m-5 flex flex-col custom-shadow rounded-2xl w-full h-screen">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
        <CustomDropdown
          label={"Degree"}
          options={degreeData?.data}
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
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
