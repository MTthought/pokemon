import * as types from "./actionTypes";
import { SinglePokemon } from "../../Types";

export function setDetails(payload: SinglePokemon) {
  return { type: types.SET_DETAILS, payload };
}
