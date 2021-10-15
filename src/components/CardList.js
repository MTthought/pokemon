import axios from "axios";
import React, {useState, useEffect} from 'react';
import Card from './Card';

const CardList = () => {
    const [pokemon, setPokemon] = useState([]);
    // to do: store page nr on local storage
    const [page, setPage] = useState({
      nr: 1,
      url: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    });
  
    useEffect(() => {
      axios.get(page.url).then((response) => {
        console.log(response.data);

        response.data.results.forEach(singlePokemon => {
          axios.get(singlePokemon.url).then((response) => {
            setPokemon(pokemon => [...pokemon, response.data] );
          })
        })

      });
    }, [page.url]);
  
    if (!pokemon) return null;
  
    return (
      <div className="Card-list">
          {pokemon.map(singlePokemon => <Card key={singlePokemon.id} singlePokemon={singlePokemon}/>)}
      </div>
    );
  };

export default CardList;