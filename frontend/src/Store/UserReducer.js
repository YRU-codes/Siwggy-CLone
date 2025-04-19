import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name : 'users',
    initialState : {
        users : [
            {
                id : 1,
                email: 'user1@gmail.com',
                password : 'User@123'
            },
        ],
        id : 1,
        loggedUser : null,
    },
    reducers : {
        logIn : (state, action)=>{
            state.loggedUser = action.payload;
        },

        logOut : (state) =>{
            if(state.loggedUser){
                state.loggedUser = null;
            }
        },
    }
})

export const{logIn, logOut} = userReducer.actions;
export default userReducer.reducer;