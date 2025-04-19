import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
    },

    reducers:{
        addItem : (state, action)=>{
            const item = action.payload;
            const existingItem = state.cartItems.find((i)=> i.id === item.id);
            if(existingItem){
                existingItem.count+=1;
            }else{
                state.cartItems.push({...item, count:1})
            }
        },
        decreaseQuantity : (state, action)=>{
            const item = action.payload;
            const existingItem = state.cartItems.find((i)=> i.id === item.id);
            if(existingItem){
                if(existingItem.count > 1){
                    existingItem.count-=1;
                }else if(existingItem.count === 1){
                    state.cartItems = state.cartItems.filter((i)=> i.id !== existingItem.id);
                }
            }
        },
        removeItems : (state, action) => {
            state.cartItems = [];
        }
    }
})

export const{addItem, decreaseQuantity, removeItems} = cartReducer.actions;

export default cartReducer.reducer;