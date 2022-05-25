import axios from "axios";

export async function getSinglePokemon(url) {
  const response = await axios.get(url);
  return response.data;
}

async function getPokemonList(urls) {
  const tempPokemon = urls.map((singlePokemon) =>
    getSinglePokemon(singlePokemon.url)
  );
  const pokemon = await Promise.all(tempPokemon);
  return pokemon;
}

export async function api(url) {
  const pageResponse = await axios.get(url);

  const pokemonList = await getPokemonList(pageResponse.data.results);

  return { page: pageResponse.data, pokemonList };
}
