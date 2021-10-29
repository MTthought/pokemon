import axios from 'axios';

async function getPokemon (urls) {
    const tempPokemon = urls.map(async singlePokemon => {
        const response = await axios.get(singlePokemon.url);
        return response.data;
    });
    const pokemon = await Promise.all(tempPokemon);
    return pokemon;
}

export default async function api(url) {
  const pageResponse = await axios.get(url);

  const pokemonList = await getPokemon(pageResponse.data.results);
      
  return {page: pageResponse.data, pokemonList};
}