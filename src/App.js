// import logo from './logo.svg';
import axios from "axios";
import {useState, useEffect} from 'react';
import './App.css';
import {sortBy, search} from "./helpers";
import CardList from './components/CardList';
import Pagination from './components/Pagination';
import Sorting from "./components/Sorting";
import SearchBar from "./components/SearchBar";

function App() {
  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  // to do: store current page on local storage
  const [page, setPage] = useState({
    current: null,
    next: null,
    previous: null
  });
  const [settings, setSettings] = useState({
    sortBy: 'unsorted',
    search: '',
  });

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
      setData([]);
      setPokemon([]);

      // update pokemon list
      // to do: https://stackoverflow.com/questions/38406920/best-way-to-wait-for-foreach-to-complete
      response.data.results.forEach(singlePokemon => {
        axios.get(singlePokemon.url).then((response) => {
          setData(data => [...data, response.data] );
          setPokemon(pokemon => [...pokemon, response.data]);
        })
      })
    });
    // reset settings on new page
    setSettings({
      sortBy: 'unsorted',
      search: '',
    });
  };

  const handleSort = value => {
    setSettings({...settings, sortBy: value});
    setPokemon(value === 'unsorted' ? search(settings.search, data) : sortBy(value, pokemon));
  };

  const handleSearch = value => {
    setSettings({...settings, search: value});
    setPokemon(settings.sortBy === 'unsorted' ? search(value, data) : search(value, pokemon));
  }

  return (
    <div className="App">
      <Pagination page={page} pager={pager} />
      <Sorting handleChange={handleSort} value={settings.sortBy} />
      <SearchBar handleChange={handleSearch} value={settings.search} />
      <CardList pokemon={pokemon} />
      <Pagination page={page} pager={pager} />
    </div>
  );
}

export default App;
