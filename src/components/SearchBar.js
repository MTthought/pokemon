// to do: fix lagging when typing onto search bar
const SearchBar = ({ handleChange, settings }) => (
  <div>
    <label htmlFor="search">Search</label>
    <input
      id="search"
      type="text"
      value={settings.search}
      placeholder="Name or ability"
      onChange={(event) =>
        handleChange(event.target.value.trim(), settings.sortBy)
      }
    />
  </div>
);

export default SearchBar;
