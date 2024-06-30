import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchName: ""
}

export const searchNameSlice = createSlice({
    name: "searchName",
    initialState: initialState,
    reducers: {
        doSearchName: (state, action) => {
            state.searchName = action.payload.searchName
        },
    }
})
export const { doSearchName } = searchNameSlice.actions
export default searchNameSlice.reducer