import axios from "axios";
import { ApiResult } from "./Types";

export async function getSinglePokemon(url: string) {
  const response = await axios.get(url);
  return response.data;
}

async function getPokemonList(results: ApiResult[]) {
  const tempPokemon = results.map((result: ApiResult) =>
    getSinglePokemon(result.url)
  );
  const pokemon = await Promise.all(tempPokemon);
  return pokemon;
}

export async function api(url: string) {
  const pageResponse: any = await axios.get(url);

  console.log("res", pageResponse);

  const pokemonList = await getPokemonList(pageResponse.data.results);

  return { page: pageResponse.data, pokemonList };
}
