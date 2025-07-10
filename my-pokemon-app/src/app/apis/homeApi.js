// apis/homeApi.js
export const fetchPokemons = async ({ pageParam = 0 }) => {
  const limit = 20;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${limit}`
  );
  const data = await res.json();

  // Build custom format
  const detailedData = data.results.map((pokemon, index) => ({
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pageParam + index + 1
    }.png`,
  }));

  return {
    pokemons: detailedData,
    nextOffset: pageParam + limit,
    hasMore: !!data.next,
  };
};

export const fetchPokemonByName = async (name) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );
  if (!res.ok) throw new Error("Pokemon not found");
  const data = await res.json();
  const spriteSources = [
    data.sprites.other["official-artwork"]?.front_default,
    data.sprites.other["home"]?.front_default,
    data.sprites.other["dream_world"]?.front_default,
    data.sprites.front_default,
    data.sprites.back_default,
    data.sprites.front_shiny,
    data.sprites.back_shiny,
  ];

  const filteredSprites = spriteSources.filter(Boolean);

  return {
    name: data.forms?.[0]?.name || name,
    image:
      data.sprites?.other?.["official-artwork"]?.front_default ||
      data.sprites?.front_default,
    base_experience: data.base_experience,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t) => t.type.name),
    moves: data.moves.map((m) => m.move.name),
    sprites: filteredSprites,
  };
};
