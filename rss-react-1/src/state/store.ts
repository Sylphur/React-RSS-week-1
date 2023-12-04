import { configureStore } from '@reduxjs/toolkit';
import componentsFormSlice from './reducers/componentsFormSlice';
import hooksFormSlice from './reducers/hooksFormSlice';
import countriesSlice from './reducers/countriesSlice';

export const store = configureStore({
  reducer: {
    componentsForm: componentsFormSlice,
    hooksForm: hooksFormSlice,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
