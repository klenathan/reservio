import axios from "axios";
import { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const { push } = useRouter();

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // let params = { query: keyword };
    // axios.get(
    //   `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/search`, params)
    // );
  };

  return (
    <form className="w-4/5 relative col-span-2" onSubmit={handleSearch}>
      <IoSearchCircleSharp className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 text-[#59981A]"></IoSearchCircleSharp>

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
