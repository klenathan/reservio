"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const TableComponent = <T extends object>(props: {
  columns: Column<T>[];
  data: T[];
}) => {
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    tableInstance.setGlobalFilter(searchParam);
  }, [searchParam]);

  const data = props.data;
  const columns = props.columns;
  const {
    state: { pageIndex, pageSize },
    ...tableInstance
  } = useTable(
    {
      columns,
      data: data,
      initialState: { pageSize: 15, globalFilter: searchParam },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="flex flex-col gap-6 items-center w-full justify-center pt-4 overflow-hidden">
      <div className="flex gap-2 h-full">
        <label
          htmlFor="search-user"
          className="flex items-center font-semibold"
        >
          Search in {data.length} records:
        </label>
        <input
          className="border-2 rounded p-1"
          id="search-user"
          placeholder="Search"
          type="text"
          value={searchParam}
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
        />
      </div>
      <p>
        Showing <b>{pageSize < data.length ? pageSize : data.length}</b> of{" "}
        <b>{data.length}</b> records
      </p>
      <div className="flex gap-8 items-center">
        <button
          className="w-[40px] h-[40px] font-semibold text-midGreen rounded-full border-2 border-midGreen
          hover:bg-green-100"
          onClick={tableInstance.previousPage}
        >
          {"<"}
        </button>
        <p className="font-semibold">
          {pageIndex + 1} / {tableInstance.pageCount}
        </p>
        <button
          className="w-[40px] h-[40px] font-semibold text-midGreen rounded-full border-2 border-midGreen
          hover:bg-green-100"
          onClick={tableInstance.nextPage}
        >
          {">>"}
        </button>
      </div>
      <table className="max-w-full w-fit bg-red-200 text-sm text-left text-gray-500 dark:text-gray-400 block overflow-x-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {tableInstance.headerGroups.map((headerGroup) => (
            <tr key={headerGroup.getHeaderGroupProps().key}>
              {headerGroup.headers.map((column) => {
                const headerProps = column.getHeaderProps(
                  column.getSortByToggleProps()
                );
                return (
                  <th
                    className="px-6 py-3 "
                    {...headerProps}
                    key={headerProps.key}
                  >
                    {column.render("Header")}
                    <span key={headerProps.key + "_span"}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "(desc)"
                          : "(asc)"
                        : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.page.map((row, i) => {
            tableInstance.prepareRow(row);
            return (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700
                hover:bg-green-100"
                key={row.getRowProps().key}
              >
                {row.cells.map((cell) => {
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
    </div>
  );
};

export default TableComponent;
