// import logo from './logo.svg';
import {useState, useEffect} from 'react';
import api from "./api";
import './App.css';
import {sortBy, search} from "./helpers";
import CardList from './components/CardList';
import Pagination from './components/Pagination';
import Sorting from "./components/Sorting";
import SearchBar from "./components/SearchBar";

function App() {
  // pokemon list as served from API
  const [data, setData] = useState([]);

  // formated pokemon list based on sort and search
  const [pokemon, setPokemon] = useState([]);

  const [page, setPage] = useState({
    current: localStorage.getItem('currentPage'),
    next: null,
    previous: null
  });

  const [settings, setSettings] = useState({
    sortBy: (localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') : 'unsorted'),
    search: (localStorage.getItem('search') ? localStorage.getItem('search') : ''),
  });

  useEffect(() => {
    pager(page.current ? page.current : 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pager = url => {
    api(url).then(apiData => {
      // update page state
      setPage({
        current: url,
        next: apiData.page.next,
        previous: apiData.page.previous
      });

      // update local storage
      localStorage.setItem('currentPage', url);

      // reset pokemon lists
      setData([]);
      setPokemon([]);

      // update pokemon lists
      setData(apiData.pokemonList);
      let tempPokemon = search(settings.search, apiData.pokemonList);
      setPokemon(sortBy(settings.sortBy, tempPokemon));
    });
  };

  const handleChange = (searchVal, sortVal) => {
    setSettings({
      search: searchVal, 
      sortBy: sortVal
    });
    localStorage.setItem('sortBy', sortVal);
    localStorage.setItem('search', searchVal);

    let tempPokemon = search(searchVal, data);
    setPokemon(sortBy(sortVal, tempPokemon));
  };

  if (!pokemon) return null;

  return (
    <div className="App">
      <Pagination page={page} pager={pager} />
      <Sorting handleChange={handleChange} settings={settings} />
      <SearchBar handleChange={handleChange} settings={settings} />
      <CardList pokemon={pokemon} />
      <Pagination page={page} pager={pager} />
    </div>
  );
}

export default App;
