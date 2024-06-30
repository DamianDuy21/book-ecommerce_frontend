import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        email: "",
        phone: "",
        userName: "",
        role: "",
        avatar: "",
        id: "",
        status: "offline",
        description: ""
    },
};

export const authenSlice = createSlice({
    name: 'authen',
    initialState: initialState,
    reducers: {
        doSignInAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doSignOutAction: (state, action) => {
            localStorage.removeItem("access_token");
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = initialState.user;
        },
        doUpdateUser: (state, action) => {
            state.user.avatar = action.payload.avatar;
            state.user.phone = action.payload.phone;
            state.user.userName = action.payload.userName;
            state.user.password = action.payload.password;
            state.user.description = action.payload.description;
        }
    },
    extraReducers: (builder) => {
        // Add any extra reducers here if needed in the future
    },
});

export const { doSignInAction, doGetAccountAction, doSignOutAction, doUpdateUser } = authenSlice.actions;

export default authenSlice.reducer;
