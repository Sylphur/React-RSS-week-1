import { searchActions } from './reducers/searchSlice';
import { pokemonActions } from './reducers/pokemonSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

const actions = {
  ...searchActions,
  ...pokemonActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useAppDispatch = () => useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
