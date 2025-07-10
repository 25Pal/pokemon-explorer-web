"use client";
import React from "react";
import Search from "../feature/Search";
import { useSearchContext } from "../../Context/SearchContext";

const Header = () => {
  const { showSearch } = useSearchContext();

  return (
    <header className="w-auto bg-orange-800 text-black shadow border-[3px] flex flex-row items-center justify-between !px-2 !py-2 rounded-md">
      <div className="flex flex-row items-center justify-start py-4 gap-3 pl-10">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
          alt="Pikachu"
          className="h-16 w-16 object-contain"
        />
        <h1 className="text-lg font-bold mt-2 border-2">Pokemon Explorer</h1>
      </div>

      {showSearch && <Search />}
    </header>
  );
};

export default Header;
