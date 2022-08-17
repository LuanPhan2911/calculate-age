import { createSlice } from '@reduxjs/toolkit'

export const ChangeLanguageSlice = createSlice({
    name: 'language',
    initialState: {
        language: 'vi',
    },
    reducers: {

        changeLanguage: (state, action) => {
            state.language = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeLanguage } = ChangeLanguageSlice.actions

export default ChangeLanguageSlice.reducer