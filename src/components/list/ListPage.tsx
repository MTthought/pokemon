import { useEffect } from "react";
import { api } from "../../api";
import CardList from "./CardList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import * as listActions from "../../redux/actions/listActions";
import { bindActionCreators } from "redux";
import Header from "../common/Header";
import { Page, SortValue, Settings, SinglePokemon, Status } from "../../Types";

interface Props {
  actions: {
    setLists: (payload: SinglePokemon[]) => void;
    setPage: (payload: Page) => void;
    setSettings: (payload: Settings) => void;
    changeList: () => void;
    getLocalStorage: () => void;
  };
  list: {
    page: Page;
    settings: Settings;
    processedList: SinglePokemon[];
    status: Status;
  };
}

function ListPage({ actions, list }: Props) {
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
      localStorage.setItem("currentPage", url);
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

function mapStateToProps(state: any) {
  return {
    list: state.list,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
