// import logo from './logo.svg';
import axios from "axios";
import {useState, useEffect} from 'react';
import './App.css';
import CardList from './components/CardList';
import Pagination from './components/Pagination';
import sortBy from "./helpers";

function App() {
  const [pokemon, setPokemon] = useState([]);
  // to do: store current url on local storage
  const [page, setPage] = useState({});

  useEffect(() => {
    pager('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const pager = url => {
    axios.get(url).then(response => {
      // update page state
      setPage({
        current: url,
        next: response.data.next,
        previous: response.data.previous
      });

      // reset pokemon list
      setPokemon([]);

      // update pokemon list
      response.data.results.forEach(singlePokemon => {
        axios.get(singlePokemon.url).then((response) => {
          setPokemon(pokemon => [...pokemon, response.data] );
        })
      });
    });
  }

  return (
    <div className="App">
      <Pagination page={page} pager={pager}/>
      <button onClick={() => setPokemon(sortBy('name', pokemon))}>sort by name</button>
      <CardList pokemon={pokemon}/>
      <Pagination page={page} pager={pager}/>
    </div>
  );
}

export default App;
