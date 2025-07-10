"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPokemonByName } from "../../apis/homeApi";

const DetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === pokemon.sprites.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? pokemon.sprites.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchPokemonByName(name);
        setPokemon(data);
      } catch (err) {
        setError("Pokemon not found.");
      } finally {
        setLoading(false);
      }
    };

    if (name) loadDetails();
  }, [name]);

  if (loading)
    return <p className="text-white text-center text-xl">Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-xl">{error}</p>;

  return (
    <div className="min-h-[86.8vh] bg-gradient-to-b from-yellow-500 to-orange-800 px-4 py-10 flex justify-center items-center">
      <div className=" rounded-lg shadow-lg p-8 max-w-md w-full text-center space-y-6">
        {/* Image Carousel */}
        <div className="relative flex items-center justify-center flex-col  !py-5">
          <div className="">
            <img
              src={pokemon.sprites[currentImageIndex]}
              alt={`${pokemon.name}-${currentImageIndex}`}
              className="!h-60 w-60  object-contain"
            />
          </div>

          <div className=" flex gap-5">
            {/* Prev */}
            <button
              onClick={handlePrev}
              className="left-0  font-bold !px-2 !bg-black !text-white !rounded-sm cursor-pointer"
            >
              Back
            </button>

            {/*  Next */}
            <button
              onClick={handleNext}
              className="right-0  font-bold !px-2 !bg-black !text-white !rounded-sm cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>

        {/*  Stats */}
        <div className="text-gray-700 text-left space-y-2">
          <p>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight}
          </p>
          <p>
            <strong>Types:</strong> {pokemon.types?.join(", ")}
          </p>
        </div>

        {/*  Moves */}
        <div className="max-h-40 overflow-y-auto border rounded p-2">
          <h2 className="text-lg font-semibold mb-2">Moves</h2>
          <ul className="list-disc list-inside text-gray-700">
            {pokemon.moves.map((move) => (
              <li key={move} className="capitalize">
                {move}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
