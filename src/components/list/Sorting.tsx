import { Settings, SortValue } from "../../Types";

interface Props {
  handleChange: (searchVal: string, sortVal: SortValue) => void;
  settings: Settings;
}

const Sorting = ({ handleChange, settings }: Props) => (
  <div>
    <label htmlFor="nameSorting">Sort by</label>
    <select
      id="nameSorting"
      value={settings.sortBy}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        handleChange(settings.search, event.target.value)
      }
    >
      <option value="unsorted">--</option>
      <option value="name">Name</option>
      <option value="height">Height</option>
      <option value="weight">Weight</option>
    </select>
  </div>
);

export default Sorting;
