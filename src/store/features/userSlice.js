
import { createSlice } from '@reduxjs/toolkit'
// import { GoVerified } from 'react-icons/go';


const initialState = {
    token: null,
    isAuthenticated: false,
    emailVerifed: false,
    emailVerifedMsg: ``,
    error: null
    // isLogin: false,
    // user: null
}

export const userSlice = createSlice({
    name: `user`,
    initialState,
    reducers: {
        setUser: (state , action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        setSuccess: (state) => {
            state.emailVerifed = true;
            state.emailVerifedMsg = "Your email has been verified!";
        },
        setError: (state , action) => {
            state.error = action.payload; 
        }
    },
})

export const { setUser , clearUser , setSuccess , setError } = userSlice.actions;

export default userSlice.reducer;