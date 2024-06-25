import React from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import {
  useCreateDegreeMutation,
  useGetDegreeQuery,
} from "../../../Redux/api/degreeApi";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

const Degree = () => {
  const [degree, setDegree] = React.useState([]);
  const [degreeId, setDegreeId] = React.useState("");
  const [degreeName, setDegreeName] = React.useState("");

  // redux
  const [createDegree] = useCreateDegreeMutation();
  const { data } = useGetDegreeQuery();

  React.useEffect(() => {
    setDegree(data);
  }, []);

  const handleAdd = async () => {
    try {
      const addResponse = await createDegree({ degreeId, degreeName }).unwrap();
      console.log(addResponse, "addResponse");
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
      <div>
        {degree?.data?.map((val) => (
          <div className=" flex items-center space-x-2">
            <h1 className=" text-xl">{val.degree_name}</h1>
            <TbEdit className=" text-2xl" />
            <MdDelete className=" text-2xl" color="red" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Degree;
