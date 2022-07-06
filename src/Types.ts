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
  details?: any;
};

export type Action = {
  type: string;
  payload?: any;
};

export interface ReduxProps {
  actions: {
    setLists: (payload: SinglePokemon[]) => void;
    setPage: (payload: Page) => void;
    setSettings: (payload: Settings) => void;
    changeList: () => void;
    getLocalStorage: () => void;
    setDetails: (payload: any) => void;
  };
  list: {
    page: Page;
    settings: Settings;
    processedList: SinglePokemon[];
    status: Status;
    details?: any;
  };
}
