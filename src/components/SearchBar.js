const SearchBar = ({ handleChange, value }) => (
    <div>
        <label htmlFor="search">Search:</label>
        <input id="search" type="text" value={value} placeholder="Name or abilities" onChange={event => handleChange(event.target.value.trim())}/>
    </div>
);
    
export default SearchBar;