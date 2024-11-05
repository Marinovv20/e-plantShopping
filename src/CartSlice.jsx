import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++; // Increase quantity if item already exists
      } else {
        // Push new item to the items array
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // Remove item from the cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload); // Remove item by name
    },
    // Update item quantity in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update quantity
      }
    },
  },
});

// Export actions for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer to use in store
export default CartSlice.reducer;
