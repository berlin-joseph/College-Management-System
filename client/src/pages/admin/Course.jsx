import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomTable from "../../components/CustomTable";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";
import { useGetSemesterQuery } from "../../Redux/api/Semester";
import { useGetDegreeQuery } from "../../Redux/api/degreeApi";
import {
  useGetDepartmentByDegreeMutation,
  useGetDepartmentQuery,
} from "../../Redux/api/departmentApi";
import {
  useCreateCourseMutation,
  useDeleteSubjectByIdMutation,
  useGetCourseQuery,
} from "../../Redux/api/CourseApi";

const Course = () => {
  // State
  const [name, setName] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [departmentData, setDepartmentData] = React.useState([]);
  const [data, setData] = React.useState([]);

  // Redux
  const { data: semesterData, refetch: semesterRefetch } =
    useGetSemesterQuery();
  const { data: degreeData, refetch: refetchDegrees } = useGetDegreeQuery();
  const { data: courseData, refetch: refetchCourse } = useGetCourseQuery();
  const [getDepartmentByDegree] = useGetDepartmentByDegreeMutation();
  const [deleteSubjectById] = useDeleteSubjectByIdMutation();
  const [createCourse] = useCreateCourseMutation();

  // Department data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResponse = await getDepartmentByDegree({
          degreeName: degree,
        }).unwrap();
        setDepartmentData(fetchResponse?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (degree) {
      fetchData();
    }
  }, [degree, getDepartmentByDegree]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createCourse({
        name,
        semester,
        degree,
        department,
      });
      refetchCourse();
      semesterRefetch();
      refetchDegrees();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {};
  const handleDelete = async (id) => {
    try {
      const deleteResponse = await deleteSubjectById({ id }).unwrap();
      refetchCourse();
      semesterRefetch();
      refetchDegrees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 m-5 flex flex-col custom-shadow rounded-2xl w-full h-screen">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <CustomInput
          label={"Course Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomDropdown
          label={"Semester"}
          options={semesterData?.data}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <CustomDropdown
          label={"Degree"}
          options={degreeData?.data}
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
        <CustomDropdown
          label={"Department"}
          options={departmentData}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <CustomButton label={"Add"} onClick={handleAdd} />
      </div>
      <hr className="py-5 mt-10" />
      <CustomTable
        data={courseData?.data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Course;
