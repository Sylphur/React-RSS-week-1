import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../../shared/constants/countries';

interface CountriesState {
  countries: string[];
}
const initialState: CountriesState = {
  countries: countries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
