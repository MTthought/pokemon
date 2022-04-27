import * as types from "./actionTypes";

export function setLists(pokemon) {
  return { type: types.SET_LISTS, pokemon };
}

export function changeList() {
  return { type: types.CHANGE_LIST };
}

export function setSettings(settings) {
  return { type: types.SET_SETTINGS, settings };
}

export function setPage(page) {
  return { type: types.SET_PAGE, page };
}
