import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonAPI } from '../services/api-query.service';
import searchSlice from './reducers/searchSlice';
import pokemonSlice from './reducers/pokemonSlice';
// import paginationSlice from './reducers/paginationSlice';
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  search: searchSlice,
  pokemon: pokemonSlice,
  // pagination: paginationSlice,
})
const hydrationReducer = ( // eslint-disable-line
  state: ReturnType<typeof rootReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});

export const setupStore = () => {
  return configureStore({
    reducer: hydrationReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
    devTools: true,
  });
};
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type SetupState = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

export const storeWrapper = createWrapper<SetupState>(setupStore, {debug: true})

