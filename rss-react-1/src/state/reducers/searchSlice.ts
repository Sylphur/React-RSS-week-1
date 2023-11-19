import { getLocalSearchParam } from "../../services/local-storage.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface searchData {
  search: string,
  isSearchLoading: boolean
}

const initialState: searchData = {
  search: getLocalSearchParam(),
  isSearchLoading: true
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setIsSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchLoading = action.payload
    }
  }
})
export const {setSearch, setIsSearchLoading} = searchSlice.actions;
export default searchSlice.reducer;