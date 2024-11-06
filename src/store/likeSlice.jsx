import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    likedList:[]
}
export const LikeSlice = createSlice({
    name:"Liked",
    initialState,
    reducers:{
        savedLikeList:(state, action) => {
            return {
                likedList:[...state.likedList, action.payload]
            }
        }
    }
})

export const {savedLikeList} = LikeSlice.actions