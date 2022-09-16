import { createSlice } from '@reduxjs/toolkit'
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        name: '',
        isAuth: false,
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
            state.isAuth = true;
        },
        register: (state, action) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
            state.isAuth = true;
        },
        logout: (state, action) => {
            state.id = '';
            state.name = '';
            state.isAuth = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, register } = UserSlice.actions

export default UserSlice.reducer;