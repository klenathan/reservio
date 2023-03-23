import { useState } from "react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  //React.FormEvent<HTMLInputElement>
  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Searching:", keyword);
  };
  return (
    <form className="w-4/5" onSubmit={handleSearch}>
      <input
        className="w-full h-[3rem] 
        px-5
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
