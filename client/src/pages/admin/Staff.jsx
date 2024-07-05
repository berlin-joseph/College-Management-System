import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomTable from "../../components/CustomTable";
import CustomDropdown from "../../components/CustomDropdown";
import {
  useCreateUserMutation,
  useDeleteUserByIdMutation,
  useGetUserByTypeMutation,
} from "../../Redux/api/authApi";
import { useGetDegreeQuery } from "../../Redux/api/degreeApi";
import {
  useGetDepartmentByDegreeMutation,
  useGetDepartmentQuery,
} from "../../Redux/api/departmentApi";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomFileUpload from "../../components/CustomFileUpload";

const Staff = () => {
  // State handle
  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userDob, setUserDob] = React.useState("");
  const [userDegree, setUserDegree] = React.useState("");
  const [userDepartment, setUserDepartment] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const [userStartYear, setUserStartYear] = React.useState("");
  const [userEndYear, setUserEndYear] = React.useState("");
  const [userImage, setUserImage] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [departmentData, setDepartmentData] = React.useState([]);

  const userTypes = [
    { id: 1, name: "admin" },
    { id: 2, name: "hod" },
    { id: 3, name: "staff" },
    { id: 4, name: "student" },
  ];

  // Redux
  const [createUser] = useCreateUserMutation();
  const [getUserByType] = useGetUserByTypeMutation();
  const [deleteUserById] = useDeleteUserByIdMutation();
  const [getDepartmentByDegree] = useGetDepartmentByDegreeMutation();
  const { data: degreeData, refetch: refetchDegrees } = useGetDegreeQuery();
  const { refetch: refetchDepartments } = useGetDepartmentQuery();

  // Staff data list
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResponse = await getUserByType({ userType: "staff" });

        setData(fetchResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getUserByType]);

  // Department data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResponse = await getDepartmentByDegree({
          degreeName: userDegree,
        });

        setDepartmentData(fetchResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userDegree) {
      fetchData();
    }
  }, [userDegree, getDepartmentByDegree]);

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("user_name", userName);
      formData.append("user_id", userId);
      formData.append("user_email", userEmail);
      formData.append("user_password", userPassword);
      formData.append("user_dob", userDob);
      formData.append("user_degree", userDegree);
      formData.append("user_department", userDepartment);
      formData.append("user_type", userType);
      formData.append("user_start_year", userStartYear);
      formData.append("user_end_year", userEndYear);
      formData.append("user_image", userImage);

      await createUser(formData).unwrap();

      setUserName("");
      setUserId("");
      setUserEmail("");
      setUserPassword("");
      setUserDob("");
      setUserDegree("");
      setUserDepartment("");
      setUserType("");
      setUserStartYear("");
      setUserEndYear("");
      setUserImage(null);

      refetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {};

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await deleteUserById({ id }).unwrap();

      refetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const refetchUsers = () => {
    refetchDegrees();
    refetchDepartments();
    getUserByType({ userType: "staff" }).then((response) => {
      setData(response.data.data);
    });
  };

  return (
    <div className="p-5 m-5 flex flex-col custom-shadow rounded-2xl w-full h-screen">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <CustomInput
          label={"User Name"}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <CustomInput
          label={"User Id"}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <CustomInput
          label={"User Email"}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <CustomInput
          label={"User Password"}
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <CustomDatePicker
          label={"User DOB"}
          value={userDob}
          onChange={(e) => setUserDob(e.target.value)}
        />
        <CustomDropdown
          label={"User Degree"}
          value={userDegree}
          options={degreeData?.data}
          onChange={(e) => setUserDegree(e.target.value)}
        />
        <CustomDropdown
          label={"User Department"}
          value={userDepartment}
          options={departmentData}
          onChange={(e) => setUserDepartment(e.target.value)}
        />
        <CustomDropdown
          label={"User Type"}
          value={userType}
          options={userTypes}
          onChange={(e) => setUserType(e.target.value)}
        />
        <CustomDatePicker
          label={"User Start Year"}
          value={userStartYear}
          onChange={(e) => setUserStartYear(e.target.value)}
        />
        <CustomDatePicker
          label={"User End Year"}
          value={userEndYear}
          onChange={(e) => setUserEndYear(e.target.value)}
        />
        <CustomFileUpload
          label={"User Image"}
          onChange={(e) => setUserImage(e.target.files[0])}
        />
        <CustomButton label={"Add"} onClick={handleAdd} />
      </div>
      <hr className="py-5 mt-10" />
      <CustomTable
        label={"Staff List"}
        data={data}
        id
        degree
        department
        year
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Staff;
