import { useEffect } from "react";
import api from "./api";
import "./App.css";
import CardList from "./components/CardList";
import Pagination from "./components/Pagination";
import Sorting from "./components/Sorting";
import SearchBar from "./components/SearchBar";
import { connect } from "react-redux";
import * as listActions from "../src/redux/actions/listActions";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

function App({ dispatch, list }) {
  const { page, settings, processedList } = list;

  useEffect(() => {
    pager(page.current ? page.current : baseUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pager = (url) => {
    // reset raw and processed lists
    dispatch(listActions.setLists([]));
    api(url).then((apiData) => {
      // update page state
      dispatch(
        listActions.setPage({
          current: url,
          next: apiData.page.next,
          previous: apiData.page.previous,
        })
      );
      // update local storage
      localStorage.setItem("currentPage", url);
      // update raw and processed lists
      dispatch(listActions.setLists(apiData.pokemonList));
    });
  };

  const handleChange = (searchVal, sortVal) => {
    // update settings
    dispatch(
      listActions.setSettings({
        search: searchVal,
        sortBy: sortVal,
      })
    );
    // update local storage
    localStorage.setItem("sortBy", sortVal);
    localStorage.setItem("search", searchVal);
    // update processed list
    dispatch(listActions.updateProcessedList());
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
        <CardList pokemon={processedList} />
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
