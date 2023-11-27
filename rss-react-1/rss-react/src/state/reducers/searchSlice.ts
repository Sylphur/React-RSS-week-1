// import { getLocalSearchParam } from '../../services/local-storage.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
interface searchData {
  search: string;
  isSearchLoading: boolean;
}

const initialState: searchData = {
  search: '',
  isSearchLoading: true,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIsSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchLoading = action.payload;
    },
  },
});
export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
