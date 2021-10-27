const Sorting = ({ handleChange, sortBy }) => (
<div>
    <label htmlFor="nameSorting">Sort by:</label>
    <select id="nameSorting" value={sortBy} onChange={event => handleChange(event.target.value)}>
      <option value="unsorted">--</option>
      <option value="name">Name</option>
      <option value="height">Height</option>
      <option value="weight">Weight</option>
    </select>
  </div>
);

export default Sorting;