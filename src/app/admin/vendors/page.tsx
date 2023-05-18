'use client';
import LoadingSpinner from '@/components/LoadingSpinner';
import apiClient from '@/config/axios.config';
import React from 'react';
import { useEffect, useState } from 'react';
import { Column } from 'react-table';
import { User } from '../../../../Types';
import TableComponent from '../components/TableComponent';

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
          Header: 'id',
          accessor: 'id',
        },
        {
          Header: 'Email',
          accessor: 'user_email',
        },
        {
          Header: 'Owner',
          accessor: 'user_firstname',
        },
        {
          Header: 'Store Name',
          accessor: 'name',
        },
        {
          Header: 'Phone',
          accessor: 'user_phoneno',
        },
        {
          Header: 'Status',
          accessor: (row) => {
            const color =
              row.status == 'PENDING'
                ? 'text-yellow-600'
                : row.status == 'ACCEPTED'
                ? 'text-green-600'
                : 'text-red-400';
            return <p className={`${color} font-semibold`}>{row.status}</p>;
          },
        },
        {
          Header: 'Sale made',
          accessor: 'sale',
        },
        {
          Header: 'Create date',
          accessor: 'createdat',
        },
        {
          Header: 'Updated date',
          accessor: 'updatedat',
        },
        {
          Header: 'Certified',
          id: 'vendor',
          accessor: (row) => {
            return row.certified ? 'True' : 'False';
          },
          Cell: (cell: any) => {
            return cell.value == 'True' ? (
              <p className='font-semibold text-midGreen'>Certified</p>
            ) : (
              <p className='font-semibold text-red-600'>Uncertified</p>
            );
          },
        },
      ] as Column<IVendor>[],
    []
  );

  useEffect(() => {
    apiClient
      .get(`/admin/vendor`)
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
        All Vendors:
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
