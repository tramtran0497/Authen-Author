import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserShowing } from "../../Pages/Home";
import { User } from "../../Pages/Register";

export interface InitialStateProps{
    userInfo: UserShowing,
    isLoading: boolean
}

const initialState: InitialStateProps = {
    userInfo: {
        name: "",
        address: "",
        DOB: "",
        phoneNumber: "",
        email: ""
    },
    isLoading: false
}

// export const fetchUserData = async() => {
//     
// }

export const fetchUser = createAsyncThunk<User>("get/fetchUser", async() => {
    const token = sessionStorage.getItem("token")
    const requestOptions = {
        headers: { 'Authorization': 'Bearer ' + token},
    };
    try{
        if(token){
            const data = await fetch(`https://teetea-api.herokuapp.com/user/username`, requestOptions)
            const resJson = await data.json()
            return resJson
        }
    } catch (err) {
        console.log("Error", err)
    } 
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.isLoading = true
                console.log("Loading")
            })
            .addCase(fetchUser.fulfilled, (state, payload) => {
                state.isLoading = false
                state.userInfo = payload.payload
                console.log("Builder",payload)
            })
            .addCase(fetchUser.rejected, (state, payload) => {
                state.isLoading = false
                console.log("Error")
            })
    }
})