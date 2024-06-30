import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortBy: "createdAt",
    sortOrder: "desc",
    object: "receipts"
};

export const manageSlice = createSlice({
    name: "manage",
    initialState,
    reducers: {
        doEditManage: (state, action) => {
            state.sortBy = action.payload.sortBy || state.sortBy;
            state.sortOrder = action.payload.sortOrder || state.sortOrder;
            state.object = action.payload.object || state.object;
        }
    }
});

export const { doEditManage } = manageSlice.actions;
export default manageSlice.reducer;
