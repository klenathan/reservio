'use client';
import LoadingSpinner from '@/components/LoadingSpinner';
import apiClient from '@/config/axios.config';
import React from 'react';
import { useEffect, useState } from 'react';
import { Column } from 'react-table';
import TableComponent from '../components/TableComponent';

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

export default function AdminUserView() {
  const [users, setUsers] = useState([]);

  const columns: Column<IUser>[] = React.useMemo(
    () =>
      [
        {
          Header: 'id',
          accessor: 'id',
        },
        {
          Header: 'Username',
          accessor: 'username',
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'name',
          accessor: 'firstName',
        },
        {
          Header: 'Phone',
          accessor: 'phoneNo',
        },
        {
          Header: 'Status',
          accessor: (row) => {
            const color =
              row.status == 'PENDING'
                ? 'text-yellow-600'
                : row.status == 'ACTIVATE'
                ? 'text-green-600'
                : row.status == 'DEACTIVATE'
                ? 'text-gray-600 '
                : 'text-red-400';
            return <p className={`${color} font-semibold`}>{row.status}</p>;
          },
        },
        {
          Header: 'Create date',
          accessor: 'createdAt',
        },
        {
          Header: 'Updated date',
          accessor: 'updatedAt',
        },
        {
          Header: 'Vendor',
          id: 'vendor',
          accessor: (row) => {
            return row.vendor != null ? 'True' : 'False';
          },
          Cell: (cell: any) => {
            return cell.value == 'True' ? (
              <p className='font-semibold text-green-600'>True</p>
            ) : (
              <p className='font-semibold text-red-600'>False</p>
            );
          },
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
    <div className='flex flex-col items-center gap-6 pt-6'>
      <h1 className=' text-xl text-oliveGreen font-bold uppercase pl-4'>
        All Accounts:
      </h1>
      {users.length > 0 ? (
        <TableComponent columns={columns} data={users} />
      ) : (
        <div className='h-full w-full'>
          {' '}
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
