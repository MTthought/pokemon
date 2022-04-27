import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "../../api";
import CardList from "./CardList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import * as listActions from "../../redux/actions/listActions";
import { bindActionCreators } from "redux";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

function ListPage({ actions, list }) {
  const { page, settings, processedList } = list;

  useEffect(() => {
    pager(page.current ? page.current : baseUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pager = (url) => {
    // reset raw and processed lists
    actions.setLists([]);
    api(url).then((apiData) => {
      // update page state
      actions.setPage({
        current: url,
        next: apiData.page.next,
        previous: apiData.page.previous,
      });
      // update local storage
      localStorage.setItem("currentPage", url);
      // update raw and processed lists
      actions.setLists(apiData.pokemonList);
    });
  };

  const handleChange = (searchVal, sortVal) => {
    // update settings
    actions.setSettings({
      search: searchVal,
      sortBy: sortVal,
    });
    // update local storage
    localStorage.setItem("sortBy", sortVal);
    localStorage.setItem("search", searchVal);
    // update processed list
    actions.changeList();
  };

  return (
    <>
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
        <Link to="details">details</Link>
        <Sorting handleChange={handleChange} settings={settings} />
        <SearchBar handleChange={handleChange} settings={settings} />
      </header>

      <div className="Container">
        <Pagination page={page} pager={pager} />
        <CardList pokemon={processedList} />
        <Pagination page={page} pager={pager} />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    list: state.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
