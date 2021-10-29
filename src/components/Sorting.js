const Sorting = ({ handleChange, settings }) => (
<div>
    <label htmlFor="nameSorting">Sort by:</label>
    <select id="nameSorting" value={settings.sortBy} onChange={event => handleChange(settings.search, event.target.value)}>
      <option value="unsorted">--</option>
      <option value="name">Name</option>
      <option value="height">Height</option>
      <option value="weight">Weight</option>
    </select>
  </div>
);

export default Sorting;