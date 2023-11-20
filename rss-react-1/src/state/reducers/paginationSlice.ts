import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationData } from "../../shared/interfaces";

const initialState: PaginationData = {
  currPage: 1,
  currPageSize: 12,
  totalCount: 30
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload
    },
    setCurrPageSize: (state, action: PayloadAction<number>) => {
      state.currPageSize = action.payload
    },
    incrementCurrPage: (state) => {
      state.currPage += 1
    },
    decrementCurrPage: (state) => {
      state.currPage -= 1
    },
  }
})
export const paginationActions = paginationSlice.actions;
export default paginationSlice.reducer;