export type SinglePokemon = {
  id: number;
  name: string;
  sprites: { other: { "official-artwork": { front_default: string } } };
  height: number;
  weight: number;
  abilities: [{ ability: { name: string } }];
};

export type Page = {
  current: string;
  next: string;
  previous: string;
};

export type Status = "No search match" | "Loading...";

export type SortValue = string | "unsorted" | "name" | "height" | "weight";

export type Settings = {
  sortBy: SortValue;
  search: string;
};
