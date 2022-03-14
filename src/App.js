// import logo from './logo.svg';
import { useState, useEffect } from "react";
import api from "./api";
import "./App.css";
import processData from "./helpers";
import CardList from "./components/CardList";
import Pagination from "./components/Pagination";
import Sorting from "./components/Sorting";
import SearchBar from "./components/SearchBar";
import { connect } from "react-redux";
import * as listActions from "../src/redux/actions/listActions";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

function App({ dispatch, list }) {
  // pokemon list as served from API
  const [data, setData] = useState([]);

  const [page, setPage] = useState({
    current: localStorage.getItem("currentPage"),
    next: null,
    previous: null,
  });

  const [settings, setSettings] = useState({
    sortBy: localStorage.getItem("sortBy")
      ? localStorage.getItem("sortBy")
      : "unsorted",
    search: localStorage.getItem("search")
      ? localStorage.getItem("search")
      : "",
  });

  useEffect(() => {
    pager(page.current ? page.current : baseUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pager = (url) => {
    // reset pokemon lists
    setData([]);
    dispatch(listActions.getList([]));

    api(url).then((apiData) => {
      // update page state
      setPage({
        current: url,
        next: apiData.page.next,
        previous: apiData.page.previous,
      });

      // update local storage
      localStorage.setItem("currentPage", url);

      // update pokemon lists
      setData(apiData.pokemonList);
      dispatch(
        listActions.getList(
          processData(apiData.pokemonList, settings.search, settings.sortBy)
        )
      );
    });
  };

  const handleChange = (searchVal, sortVal) => {
    setSettings({
      search: searchVal,
      sortBy: sortVal,
    });
    localStorage.setItem("sortBy", sortVal);
    localStorage.setItem("search", searchVal);

    dispatch(listActions.getList(processData(data, searchVal, sortVal)));
  };

  return (
    <div className="App">
      <header className="Header">
        <img
          src="/pokeapi_logo.png"
          alt="PokéAPI"
          className="Logo"
          onClick={() => {
            localStorage.removeItem("currentPage");
            localStorage.removeItem("search");
            localStorage.removeItem("sortBy");
            window.location.reload();
          }}
        />
        <Sorting handleChange={handleChange} settings={settings} />
        <SearchBar handleChange={handleChange} settings={settings} />
      </header>

      <div className="Container">
        <Pagination page={page} pager={pager} />
        <CardList pokemon={list.processed} />
        <Pagination page={page} pager={pager} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    list: state.list,
  };
}

export default connect(mapStateToProps)(App);
