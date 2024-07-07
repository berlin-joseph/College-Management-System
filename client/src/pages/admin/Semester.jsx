import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomTable from "../../components/CustomTable";
import {
  useCreateSemesterMutation,
  useDeleteSemesterByIdMutation,
  useGetSemesterQuery,
} from "../../Redux/api/Semester";

const Semester = () => {
  // state
  const [semester, setSemester] = React.useState("");

  //   Redux
  const [createSemester] = useCreateSemesterMutation();
  const [deleteSemesterById] = useDeleteSemesterByIdMutation();
  const { data, refetch } = useGetSemesterQuery();

  // Create Semester
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await createSemester({ semester })
        .unwrap()
        .then((res) => {
          setSemester("");
          refetch();
        });
    } catch (error) {
      console.log("Error creating semester:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSemesterById({ id })
        .unwrap()
        .then((res) => {
          refetch();
        });
    } catch (error) {
      console.log("Error deleting semester:", error);
    }
  };

  return (
    <div className="p-5 m-5 flex flex-col custom-shadow rounded-2xl w-full h-screen">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <CustomInput
          label={"Semester"}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <CustomButton label={"Add"} onClick={handleAdd} />
      </div>
      <hr className="py-5 mt-10" />
      <CustomTable
        data={data?.data}
        handleEdit={() => {}}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Semester;
