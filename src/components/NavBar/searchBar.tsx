import { useState } from "react";
import Image from "next/image" 
import { IoSearchCircleSharp } from "react-icons/io5";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  //React.FormEvent<HTMLInputElement>
  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Searching:", keyword);
  };
  const size = 32;
  const style = {color: "#59981A"}
  return (
    <form className="w-4/5 relative col-span-3 md:col-span-1" onSubmit={handleSearch}>
      <IoSearchCircleSharp className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3" style={style}></IoSearchCircleSharp> 
      
      <input
        className="w-full h-[3rem] 
        px-12
        rounded-2xl border-2 border-solid
         border-gray-500"
        type="text"
        name="Search"
        id="search-input"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        placeholder="What's on your mind?"
      />
    </form>
  );
}
