import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
   'pizza/fetchPizzasStatus',
   async (params, thunApi) => {
      const { sortBy, dir, category, search, currentPage } = params
      const { data } = await axios.get(
         `https://64a5784800c3559aa9bfc2df.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${dir}${search}`
      )
      return data
   }
)

const initialState = {
   items: [],
   status: 'pending'
}

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action) {
         state.items = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = "pending"
            state.items = []
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = "success"
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = "error"
            state.items = []
         })
   }
})

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer