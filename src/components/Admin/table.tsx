import apiClient from "@/config/axios.config";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Column, useTable } from "react-table";
import { User } from "../../../Types";

interface Vendor {
  id: string;
}

interface IUser {
  id: string;
  avatar: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  status: string;
  updatedAt: string;
  username: string;
  vendor: Vendor | null;
}

const TableComponent = (props: { data: IUser[] }) => {
  const columns: Column<IUser>[] = React.useMemo(
    () =>
      [
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Username",
          accessor: "username",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "name",
          accessor: "firstName",
        },
        {
          Header: "Phone",
          accessor: "phoneNo",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Create date",
          accessor: "createdAt",
        },
        {
          Header: "Updated date",
          accessor: "updatedAt",
        },
        {
          Header: "Vendor",
          accessor: "vendor",
          Cell: ({ cell: { value } }) => {
            return value != null ? (
              <p className="font-semibold text-green-400">True</p>
            ) : (
              <p className="font-semibold text-red-400">False</p>
            );
          },
        },
        {
          width: 300,
          Header: "Action",
          Cell: (cell: any) => (
            <button
            className="underline font-semibold hover:text-red-400"
              onClick={() => {
                console.log("clicked", cell.row.values.id);
              }}
            >
              Deactivate
            </button>
          ),
        },
      ] as Column<IUser>[],
    []
  );
  const data = props.data;
  const tableInstance = useTable({ columns, data: data });
  const rows = tableInstance.rows;

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {tableInstance.headerGroups.map((headerGroup) => (
          <tr key={headerGroup.getHeaderGroupProps().key}>
            {headerGroup.headers.map((column) => (
              <th className="px-6 py-3" key={column.getHeaderProps().key}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          tableInstance.prepareRow(row);
          return (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700
              hover:bg-green-100"
              key={row.getRowProps().key}
            >
              {row.cells.map((cell) => {
                // if (cell.column.id == "vendor") {
                //   cell.value =
                //     cell.value != null ? (
                //       <p className="font-semibold text-green-400">True</p>
                //     ) : (
                //       <p className="font-semibold text-red-400">False</p>
                //     );
                // }
                let cell_k = cell.getCellProps().key;
                return (
                  <td className="px-6 py-4" key={cell_k}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiClient
      .get(`/user`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
    //
  }, []);

  return (
    <div>
      <h1 className="w-full text-xl text-oliveGreen font-bold uppercase pl-4">
        All Accounts:
      </h1>
      {users.length > 0 && <TableComponent data={users} />}
    </div>
  );
};

export default Table;
