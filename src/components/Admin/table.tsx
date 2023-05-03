import TableComponent from "@/app/admin/components/TableComponent";
import apiClient from "@/config/axios.config";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Column, useTable } from "react-table";
import { User } from "../../../Types";
import LoadingSpinner from "../LoadingSpinner";

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

const Table = () => {
  const [users, setUsers] = useState([]);

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
    <div className="w-full">
      <h1 className="w-full text-xl text-oliveGreen font-bold uppercase pl-4">
        All Accounts:
      </h1>
      {users.length > 0 ? (
        <TableComponent columns={columns} data={users} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Table;
