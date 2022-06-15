import { Settings, SortValue } from "../../Types";

interface Props {
  handleChange: (searchVal: string, sortVal: SortValue) => void;
  settings: Settings;
}

// to do: fix lagging when typing onto search bar
const SearchBar = ({ handleChange, settings }: Props) => (
  <div>
    <label htmlFor="search">Search</label>
    <input
      id="search"
      type="text"
      value={settings.search}
      placeholder="Name or ability"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(event.target.value.trim(), settings.sortBy)
      }
    />
  </div>
);

export default SearchBar;
