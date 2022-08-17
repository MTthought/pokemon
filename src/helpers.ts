import { SortValue, SinglePokemon } from "./Types";

const sortBy = (key: SortValue, array: SinglePokemon[]) =>
  [...array].sort((a, b) => {
    if (key !== "--" && a[key] < b[key]) {
      return -1;
    } else {
      return 1;
    }
  });

const search = (target: string, array: SinglePokemon[]) =>
  array.filter((element) => {
    if (
      element.name.includes(target.toLowerCase()) ||
      element.abilities.some((element) =>
        element.ability.name.includes(target.toLowerCase())
      )
    ) {
      return true;
    } else {
      return false;
    }
  });

const processData = (
  data: SinglePokemon[],
  searchVal: string,
  sortVal: SortValue
) => {
  const filteredData = search(searchVal, data);
  return sortBy(sortVal, filteredData);
};

export default processData;
