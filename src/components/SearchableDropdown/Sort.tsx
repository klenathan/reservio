import React, {useEffect, useState} from "react";
import {FaSort} from "react-icons/fa";
import Select from "react-select";
import {AiOutlineControl} from "react-icons/ai";


interface SortProps {
    sortOptions: any
    toggleFilter?: any
    parentCallBack?: any
}


const Sort = (props: SortProps) => {
    const [sortKey, setSortKey] = useState("sortName");
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
        <div className={'w-full flex flex-row justify-between'}>
            <div className={'flex flex-col md:flex-row items-center space-x-1 md:space-x-4'}>
                <div className={'font-bold'}>
                    Sort By:
                </div>
                <Select
                    options={props.sortOptions}
                    onChange={handleSortChange}
                    defaultValue={props.sortOptions[0].value}
                    placeholder="Select a field"
                />
            </div>
            <div
                className={'inline-flex items-center float-right space-x-6'}
            >
                <div className={'inline-flex items-center cursor-pointer space-x-1'}  onClick={props.toggleFilter}>
                    <div>
                        Filter
                    </div>
                    <AiOutlineControl className={'hover:scale-110'}/>
                </div>
                <div onClick={(toggleSortOrder)} className={'inline-flex items-center cursor-pointer space-x-1'}>
                    {sortOrder == "asc" ? "Ascending" : "Descending"}
                    <FaSort className={'hover:scale-110'}/>
                </div>


            </div>
        </div>
    );
};

export default Sort;