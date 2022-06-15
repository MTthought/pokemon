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
  next: string | null;
  previous: string | null;
};

export type Status = "No search match" | "Loading...";

export type SortValue = "unsorted" | "name" | "height" | "weight" | string;

export type Settings = {
  sortBy: SortValue;
  search: string;
};

export type LocalStorage = string | null;

export type ListState = {
  page: Page;
  settings: Settings;
  rawList: SinglePokemon[];
  processedList: SinglePokemon[];
  status: Status;
};

export type Action = {
  type: string;
  payload?: any;
};
