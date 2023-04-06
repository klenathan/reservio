import { useState } from "react";
import Image from "next/image";


export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  //React.FormEvent<HTMLInputElement>
  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Searching:", keyword);
  };
  const size = 32;
  return (
    <form className="w-4/5 relative" onSubmit={handleSearch}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
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
