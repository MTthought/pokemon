import { useEffect } from "react";
import { api } from "../../api";
import CardList from "./CardList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import Header from "../common/Header";
import { SinglePokemon, SortValue, ReduxProps } from "../../Types";

function ListPage({ actions, list }: ReduxProps) {
  const { page, settings, processedList, status } = list;

  useEffect(() => {
    actions.getLocalStorage();
    pager(page.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pager = (url: string) => {
    // reset raw and processed lists
    actions.setLists([]);
    api(url).then((apiData: { page: any; pokemonList: SinglePokemon[] }) => {
      // update page state
      actions.setPage({
        current: url,
        next: apiData.page.next,
        previous: apiData.page.previous,
      });
      // update local storage
      localStorage.setItem("currentPage", url); // to do: reloading doesn't save page
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
