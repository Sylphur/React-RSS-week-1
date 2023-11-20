import { searchActions } from "./reducers/searchSlice";
import { pokemonActions } from "./reducers/pokemonSlice";
import { paginationActions } from "./reducers/paginationSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { RootState } from "./store";

const actions = { 
  ...searchActions,
  ...pokemonActions,
  ...paginationActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch)
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;