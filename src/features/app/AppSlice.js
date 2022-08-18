import { createSlice } from '@reduxjs/toolkit'

export const AppSlice = createSlice({
    name: 'app',
    initialState: {
        language: 'vi',
        mode: 0,
    },
    reducers: {

        changeLanguage: (state, action) => {
            state.language = action.payload
        },
        changeMode: (state, action) => {
            state.mode = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeLanguage, changeMode } = AppSlice.actions

export default AppSlice.reducer