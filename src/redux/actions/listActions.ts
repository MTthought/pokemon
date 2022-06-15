import * as types from "./actionTypes";
import { SinglePokemon, Settings, Page } from "../../Types";

export function setLists(pokemon: SinglePokemon[]) {
  return { type: types.SET_LISTS, pokemon };
}

export function changeList() {
  return { type: types.CHANGE_LIST };
}

export function setSettings(settings: Settings) {
  return { type: types.SET_SETTINGS, settings };
}

export function setPage(page: Page) {
  return { type: types.SET_PAGE, page };
}
