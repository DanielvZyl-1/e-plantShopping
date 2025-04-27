import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost, onSale = false } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.onSale = onSale;
        } else {
            state.items.push({ name, image, cost, quantity: 1, onSale});
        }
    },

    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload)
        },

    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
        }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export const selectCartItemCount = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default CartSlice.reducer;
