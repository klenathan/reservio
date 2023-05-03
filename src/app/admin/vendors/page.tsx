"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import apiClient from "@/config/axios.config";
import React from "react";
import { useEffect, useState } from "react";
import { Column } from "react-table";
import { User } from "../../../../Types";
import TableComponent from "../components/TableComponent";

interface IVendor {
  certified: boolean;
  desc: string;
  id: string;
  name: string;
  phone: string;
  status: string;
  user: User | null;
  userId: string;
  username: string;
}

export default function AdminUserView() {
  const [users, setUsers] = useState([]);

  const columns: Column<IVendor>[] = React.useMemo(
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
          accessor: (row) => {
            return row.user?.email;
          },
        },
        {
          Header: "Owner",
          accessor: (row) => {
            return row.user?.firstName;
          },
        },
        {
          Header: "Store Name",
          accessor: "name",
        },
        {
          Header: "Phone",
          accessor: (row) => {
            return row.user?.phoneNo;
          },
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
          Header: "Certified",
          id: "vendor",
          accessor: (row) => {
            //// Cannot clean code this :(
            //// had to do this so that it can be sorted
            return row.certified ? "True" : "False";
          },
          Cell: (cell: any) => {
            return cell.value == "True" ? (
              <p className="font-semibold text-midGreen">Certified</p>
            ) : (
              <p className="font-semibold text-red-400">Uncertified</p>
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
      ] as Column<IVendor>[],
    []
  );

  useEffect(() => {
    apiClient
      .get(`/vendor`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
    //
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 pt-6">
      <h1 className=" text-xl text-oliveGreen font-bold uppercase pl-4">
        All Vendors:
      </h1>
      {users.length > 0 ? (
        <TableComponent columns={columns} data={users} />
      ) : (
        <div className="h-full w-full">
          {" "}
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
