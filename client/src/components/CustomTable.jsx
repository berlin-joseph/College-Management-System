import React from "react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

const CustomTable = ({
  data,
  id,
  email,
  degree,
  department,
  year,
  image,
  handleDelete,
  handleEdit,
  label,
}) => {
  return (
    <section className="antialiased text-gray-600 h-screen px-4">
      <div className="flex flex-col h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">{label}</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    {id && (
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Id</div>
                      </th>
                    )}
                    {email && (
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Email</div>
                      </th>
                    )}
                    {degree && (
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Degree</div>
                      </th>
                    )}
                    {department && (
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Department
                        </div>
                      </th>
                    )}
                    {year && (
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Year</div>
                      </th>
                    )}
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data?.map((item) => (
                    <tr key={item?._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-2 sm:mr-3">
                            {image && (
                              <img
                                className="rounded-full"
                                src={item?.user_image}
                                width="50"
                                height="50"
                              />
                            )}
                          </div>
                          <div className="font-medium text-gray-800">
                            {item?.name}
                          </div>
                        </div>
                      </td>
                      {id && (
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item?.user_id}</div>
                        </td>
                      )}
                      {email && (
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item?.user_email}</div>
                        </td>
                      )}
                      {degree && (
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {item?.user_degree?.degree_name}
                          </div>
                        </td>
                      )}
                      {department && (
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {item?.user_department?.department_name}
                          </div>
                        </td>
                      )}
                      {year && (
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            {`${item?.user_start_year} - ${item?.user_end_year}`}
                          </div>
                        </td>
                      )}
                      <td className="p-2 whitespace-nowrap flex justify-center">
                        <TbEdit
                          className="text-2xl cursor-pointer"
                          onClick={() => handleEdit(item?._id)}
                        />
                        <MdDelete
                          className="text-2xl cursor-pointer"
                          color="red"
                          onClick={() => handleDelete(item?._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomTable;
