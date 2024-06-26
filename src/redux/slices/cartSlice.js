import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
   totalPrice: 0,
   items: []
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action) {
         const findItem = state.items.find(obj => {
            return obj.id === action.payload.id
               && obj.type === action.payload.type
               && obj.size === action.payload.size
         })

         if (findItem) {
            findItem.count++
         } else {
            state.items.push(
               {
                  ...action.payload,
                  count: 1
               }
            )
         }

         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum
         }, 0)
      },
      removeItem(state, action) {
         state.items = state.items.filter(obj => {
            return obj.id !== action.payload.id
               || obj.type !== action.payload.type
               || obj.size !== action.payload.size
         })
         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum
         }, 0)
      },
      itemCountDown(state, action) {
         const findItem = state.items.find(obj => {
            return obj.id === action.payload.id
               && obj.type === action.payload.type
               && obj.size === action.payload.size
         })
         if (findItem.count > 1) {
            findItem.count--
         } else {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
         }
         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum
         }, 0)
      },
      clearItems(state) {
         state.items = []
         state.totalPrice = 0
      },
   }
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.filter((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, itemCountDown } = cartSlice.actions

export default cartSlice.reducer