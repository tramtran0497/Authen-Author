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
        email: "",
        _id: "",
    },
    isLoading: false
}

// export const fetchUserData = async() => {
//     
// }

export const fetchUser = createAsyncThunk<User>("get/fetchUser", async() => {
    const token = sessionStorage.getItem("token")
    const url = process.env.REACT_APP_BASE_URL_HEROKU as string

    const requestOptions = {
        headers: { 'Authorization': 'Bearer ' + token},
    };
    try{
        if(token){
            const data = await fetch(`${url}/user/username`, requestOptions)
            const resJson = await data.json()
            console.log("RES", resJson)
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