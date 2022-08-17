import { useEffect } from "react";
import { connect } from "react-redux";
import * as listActions from "../../redux/actions/listActions";
import { bindActionCreators } from "redux";
import { api } from "../../api";
import CardList from "./CardList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import Header from "../common/Header";
import {
  SortValue,
  LocalStorage,
  SinglePokemon,
  Page,
  Settings,
  Status,
} from "../../Types";

interface Props {
  actions: {
    setLists: (payload: SinglePokemon[]) => void;
    setPage: (payload: Page) => void;
    setSettings: (payload: Settings) => void;
    changeList: () => void;
  };
  state: {
    page: Page;
    settings: Settings;
    processedList: SinglePokemon[];
    status: Status;
  };
}

function ListPage({ actions, state }: Props) {
  const { page, settings, processedList, status } = state;

  useEffect(() => {
    const currentPage: LocalStorage = localStorage.getItem("currentPage");
    const sortValue: any = localStorage.getItem("sortBy"); // any type allows for SortValue type
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
    api(url).then((apiData: { page: any; pokemonList: any[] }) => {
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
    localStorage.setItem("sortBy", JSON.stringify(sortVal));
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
    state: state.list,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
