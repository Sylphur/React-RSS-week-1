import { PaginationData } from "../../shared/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PaginationData = {
  currPage: 0,
  currPageSize: 12,
  totalCount: 30
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload
    },
    setCurrentPageSize: (state, action: PayloadAction<number>) => {
      state.currPageSize = action.payload
    }
  }
})
export const {setCurrentPage, setCurrentPageSize} = paginationSlice.actions;
export default paginationSlice.reducer;