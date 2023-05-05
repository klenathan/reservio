import React, {useEffect, useState} from "react";
import {FaSort} from "react-icons/fa";
import Select from "react-select";


interface SortProps {
    sortOptions: SortOptionsProps[]
    parentCallBack?: any
}

export interface SortOptionsProps {
    value: string
    label: string
}

const Sort = (props: SortProps) => {
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const toggleSortOrder = () => {
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    };


    const handleSortChange = (option: any) => {
        setSortKey(option.value);
    };

    useEffect(() => {
        props.parentCallBack({
            sortBy: sortKey,
            order: sortOrder
        })
    }, [sortOrder])


    return (
        <div>
            <div>
        <span>
          Sort By:
          <Select
              options={props.sortOptions}
              onChange={handleSortChange}
              placeholder="Select a field"
          />
        </span>
                <span onClick={(toggleSortOrder)}>
          <FaSort/>
                    {sortOrder == "asc" ? "Ascending" : "Descending"}
        </span>
            </div>
        </div>
    );
};

export default Sort;