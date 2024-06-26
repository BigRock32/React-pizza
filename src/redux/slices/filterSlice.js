import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   searchValue: '',
   categoryId: 0,
   currentPage: 1,
   sort: {
      name: 'популярности ↑',
      sortProperty: 'rating',
      dir: 'ask'
   }
}

export const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setCategoryId(state, action) {
         state.categoryId = action.payload
      },
      setSearchValue(state, action) {
         state.searchValue = action.payload
      },
      setSortType(state, action) {
         state.sort = action.payload
      },
      setCurrentPge(state, action) {
         state.currentPage = action.payload.selected + 1
      },
      setFilters(state, action) {
         state.sort = action.payload.sort
         state.currentPage = Number(action.payload.currentPage)
         state.categoryId = Number(action.payload.categoryId)
      }
   },
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sort

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer