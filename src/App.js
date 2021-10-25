// import logo from './logo.svg';
import axios from "axios";
import {useState, useEffect} from 'react';
import './App.css';
import CardList from './components/CardList';
import Pagination from './components/Pagination';

function App() {
  const [pokemon, setPokemon] = useState([]);
  // to do: store current url on local storage
  const [page, setPage] = useState({
    next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
    previous: null
  });

  useEffect(() => {
    pager(page.next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pager = url => {
    axios.get(url).then(response => {
      // update page state
      setPage({
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
      <CardList pokemon={pokemon}/>
      <Pagination page={page} pager={pager}/>
    </div>
  );
}

export default App;
