import { useEffect } from "react";
import { api } from "../../api";
import CardList from "./CardList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import Header from "../common/Header";
import {
  SinglePokemon,
  SortValue,
  ReduxProps,
  LocalStorage,
} from "../../Types";

function ListPage({ actions, list }: ReduxProps) {
  const { page, settings, processedList, status } = list;

  useEffect(() => {
    const currentPage: LocalStorage = localStorage.getItem("currentPage");
    const sortValue: LocalStorage = localStorage.getItem("sortBy");
    const searchValue: LocalStorage = localStorage.getItem("search");
    const list: LocalStorage = localStorage.getItem("list");

    if (list && currentPage) {
      actions.setLists(JSON.parse(list));
      actions.setPage(JSON.parse(currentPage));
    } else {
      pager(page.current); // fetch data if not in local storage
    }

    if (sortValue || searchValue) {
      const searchVal: string = searchValue ? searchValue : settings.search; // default to init state if not in local storage
      const sortVal: SortValue = sortValue ? sortValue : settings.sortBy;
      handleChange(searchVal, sortVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pager = (url: string) => {
    // reset raw and processed lists
    actions.setLists([]);
    api(url).then((apiData: { page: any; pokemonList: SinglePokemon[] }) => {
      const page = {
        current: url,
        next: apiData.page.next,
        previous: apiData.page.previous,
      };
      // update page state
      actions.setPage(page);
      // update local storage
      localStorage.setItem("currentPage", JSON.stringify(page));
      localStorage.setItem("list", JSON.stringify(apiData.pokemonList));
      // update raw and processed lists
      actions.setLists(apiData.pokemonList);
    });
  };

  const handleChange = (searchVal: string, sortVal: SortValue) => {
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
      <Header>
        <Sorting handleChange={handleChange} settings={settings} />
        <SearchBar handleChange={handleChange} settings={settings} />
      </Header>

      <div className="Container">
        <Pagination page={page} pager={pager} />
        <CardList pokemon={processedList} status={status} />
        <Pagination page={page} pager={pager} />
      </div>
    </>
  );
}

export default ListPage;
