"use client";

import React, { useEffect, useState } from "react";
import { fetchPokemonByName, fetchPokemons } from "../apis/homeApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { useSearchContext } from "../../Context/SearchContext";
const HomePage = () => {
  const router = useRouter();
  const [pokemons, setPokemons] = useState([]);
  const { setShowSearch, search } = useSearchContext();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      queryFn: fetchPokemons,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextOffset : undefined,
    });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && search === "") {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data && search === "") {
      const flatData = data.pages.flatMap((page) => page.pokemons);
      setPokemons(flatData);
    } else {
      setPokemons([]);
    }
  }, [data, search]);

  useEffect(() => {
    const loadData = async () => {
      if (search === "") {
        const flatData = data?.pages?.flatMap((page) => page.pokemons) || [];
        setPokemons(flatData);
      } else {
        try {
          const result = await fetchPokemonByName(search);
          setPokemons([result]);
        } catch (err) {
          setPokemons([]);
        }
      }
    };

    loadData();
  }, [data, search]);

  useEffect(() => {
    setShowSearch(true);
    return () => {
      setShowSearch(false);
    };
  }, []);

  return (
    <div
      className=" bg-black !px-4 !py-8 "
      style={{ height: "86.8vh", overflow: "auto", scrollbarWidth: "none" }}
    >
      {pokemons?.length === 0 || isLoading ? (
        <p className="text-white text-center text-xl">Loading Pokémon...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-6 max-w-8xl mx-auto">
          {pokemons &&
            pokemons?.map((pokemon) => (
              <div
                onClick={() => router.push(`/detail/${pokemon.name}`)}
                key={pokemon.name}
                className="bg-white p-4 rounded-lg shadow hover:scale-105 hover:bg-blue-50 transition-transform cursor-pointer text-center"
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="mx-auto h-20 w-20 object-cover "
                />
                <p className="mt-2 font-semibold text-gray-700 ">
                  {pokemon.name}
                </p>
              </div>
            ))}

          <div ref={ref} className="h-10 mt-10 ">
            {isFetchingNextPage && (
              <p className="text-white text-center">Loading more...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
