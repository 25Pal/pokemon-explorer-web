"use client";

import { useSearchContext } from "@/Context/SearchContext";
import React, { useEffect, useState } from "react";

const Search = () => {
  const { setSearch } = useSearchContext();
  const [value, setValue] = useState("");

  const handleSearchInput = () => {
    setSearch(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchInput();
    }
  };

  useEffect(() => {
    if (value === "") {
      setSearch("");
    }
  }, [value]);
  return (
    <div className="max-w-md mx-auto mb-8 relative" onKeyDown={handleKeyDown}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search Pokemon By Name..."
        className="w-100 h-10 !px-4 !py-2  !bg-amber-100 border !rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 border-r-4"
      />

      {value && (
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-red-600"
          onClick={() => setValue("")}
        >
          ✕
        </div>
      )}
    </div>
  );
};

export default Search;
