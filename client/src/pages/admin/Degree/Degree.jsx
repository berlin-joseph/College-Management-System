import React from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import {
  useCreateDegreeMutation,
  useDeleteDegreeByIdMutation,
  useGetDegreeQuery,
} from "../../../Redux/api/degreeApi";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import CustomTable from "../../../components/CustomTable";

const Degree = () => {
  const [degreeId, setDegreeId] = React.useState("");
  const [degreeName, setDegreeName] = React.useState("");

  // redux
  const [createDegree] = useCreateDegreeMutation();
  const [deleteDegreeById] = useDeleteDegreeByIdMutation();
  const { data, refetch } = useGetDegreeQuery();

  const handleAdd = async () => {
    try {
      const addResponse = await createDegree({ degreeId, degreeName }).unwrap();
      console.log(addResponse, "addResponse");
      refetch();
      setDegreeId("");
      setDegreeName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {};
  const handleDelete = async (id) => {
    console.log(id, "id");
    try {
      const deleteResponse = await deleteDegreeById({ id }).unwrap();
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
          label={"Degree Id"}
          value={degreeId}
          onChange={(e) => setDegreeId(e.target.value)}
        />
        <CustomInput
          label={"Degree Name"}
          value={degreeName}
          onChange={(e) => setDegreeName(e.target.value)}
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

export default Degree;
