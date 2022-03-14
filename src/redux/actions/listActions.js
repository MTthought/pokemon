export function setLists(pokemon) {
  return { type: "SET_LISTS", pokemon };
}

export function updateProcessedList() {
  return { type: "UPDATE_PROCESSED_LIST" };
}

export function setSettings(settings) {
  return { type: "SET_SETTINGS", settings };
}

export function setPage(page) {
  return { type: "SET_PAGE", page };
}
