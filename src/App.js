// import logo from './logo.svg';
import axios from "axios";
import {useState, useEffect} from 'react';
import './App.css';
import sortBy from "./helpers";
import CardList from './components/CardList';
import Pagination from './components/Pagination';
import Sorting from "./components/Sorting";

function App() {
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
      setPokemon([]);

      // update pokemon list
      response.data.results.forEach(singlePokemon => {
        axios.get(singlePokemon.url).then((response) => {
          setPokemon(pokemon => [...pokemon, response.data] );
        })
      })
    });
    // reset sorting on new page
    setSettings({...settings, sortBy: 'unsorted'});
  };

  const handleChange = value => {
    setSettings({...settings, sortBy: value});
    if(value === 'unsorted'){
      pager(page.current);
    }else{
      setPokemon(sortBy(value, pokemon));
    };
  };

  return (
    <div className="App">
      <Pagination page={page} pager={pager}/>
      <Sorting handleChange={handleChange} sortBy={settings.sortBy}/>
      <CardList pokemon={pokemon}/>
      <Pagination page={page} pager={pager}/>
    </div>
  );
}

export default App;
