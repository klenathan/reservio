import axios from "axios";
import { useEffect, useState } from "react";

interface Vendor {
  id: string;
}

interface IUser {
  id: string;
  avatar?: string;
  email: string;
  phoneNo: string;
  status: string;
  username: string;
  vendor?: Vendor;
}

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/user`)
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  return (
    <div>
      <h1 className="w-full text-xl text-oliveGreen font-bold uppercase pl-4">
        All Accounts:
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Avatar
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Vendor
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser) => {
              return (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.avatar}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phoneNo}</td>
                  <td className="px-6 py-4">{user.vendor ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">{user.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
