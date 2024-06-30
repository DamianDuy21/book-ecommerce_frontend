import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    product: [],
    shipment: 0,
}

export const buyNowSlice = createSlice({
    name: "buyNow",
    initialState: initialState,
    reducers: {
        doAddToBuyNow: (state, action) => {
            state.product = []; // Ensuring productList is an array
            state.shipment = 30000
            state.product.unshift(action.payload);
        },
        doAdjustQuantityProductBuyNow: (state, action) => {
            const { quantity, status } = action.payload;
            if (!Array.isArray(state.product)) {
                state.product = []; // Ensuring productList is an array
            }
            if (status == "") {
                state.product[0].quantity = quantity
            }
            else if (status == "plus") {
                state.product[0].quantity = state.product[0].quantity + 1
            }
            else if (status == "minus") {
                state.product[0].quantity = state.product[0].quantity - 1
            }

        },
        resetBuyNow: (state) => {
            return initialState;
        }
    }
})

export const { doAddToBuyNow, doAdjustQuantityProductBuyNow, resetBuyNow } = buyNowSlice.actions
export default buyNowSlice.reducer