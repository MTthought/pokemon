import { SortValue, Settings } from "../../Types";
import { sortOptions } from "../../constants";

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
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        const value: any = event.target.value;
        handleChange(settings.search, value);
      }}
    >
      {sortOptions.map((option, i) => (
        <option value={option} key={i}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Sorting;
