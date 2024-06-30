import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    shipment: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        doAddToCart: (state, action) => {
            if (!Array.isArray(state.productList)) {
                state.productList = []; // Ensuring cart is an array
            }
            state.shipment = 30000
            const foundItems = state.productList.filter(item => item._id === action.payload._id);
            if (foundItems.length > 0) {
                state.productList.map(item => {
                    if (item._id == action.payload._id) {
                        item.quantity += 1
                    }
                })
            }
            else state.productList.unshift(action.payload);
        },
        doRemoveFormCart: (state, action) => {
            if (!Array.isArray(state.productList)) {
                state.productList = []; // Ensuring productList is an array
            }
            const { _id, status } = action.payload;
            const pos = state.productList.findIndex(item => item._id === _id);
            state.productList.splice(pos, 1)
        },
        doAdjustQuantityProduct: (state, action) => {
            if (!Array.isArray(state.productList)) {
                state.productList = []; // Ensuring productList is an array
            }
            const { _id, quantity, status } = action.payload;
            const pos = state.productList.findIndex(item => item._id === _id);
            if (status == "") {
                state.productList[pos].quantity = quantity
            }
            else if (status == "plus") {
                state.productList[pos].quantity = state.productList[pos].quantity + 1
            }
            else if (status == "minus") {
                state.productList[pos].quantity = state.productList[pos].quantity - 1
            }

        },
        resetCart: (state) => {
            return initialState;
        }
    }
});

export const { doAddToCart, resetCart, doRemoveFormCart, doAdjustQuantityProduct } = cartSlice.actions;
export default cartSlice.reducer;
