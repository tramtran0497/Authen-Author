import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UserShowing } from '../../Pages/Home'

export interface InitialState {
  user: UserShowing,
  isLoading: boolean,
}

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async() => {
    try{
      const token = sessionStorage.getItem("token")

      const requestOptions = {
          headers: { 'Authorization': 'Bearer ' + token},
      };
      const response = await fetch(`https://teetea-api.herokuapp.com/user/username`, requestOptions)
      const resJson = await response.json()
      console.log(resJson)
    } catch(err){
      console.log(err)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: "",
      phoneNumber: "",
      address: "",
      DOB: "",
      email: ""
    },
    isLoading: false,
  },
  reducers: {
    [getUserInfo.pending.toString()]: (state) => {
        state.isLoading = true;
    },
    [getUserInfo.fulfilled.toString()]: (state, action: PayloadAction<UserShowing>) => {
        state.isLoading = false;
        state.user = action.payload;
    },
    [getUserInfo.rejected.toString()]: (state) => {
      state.isLoading = false;
      // error
    },
  },
})

// export const {} = userSlice.actions

export default userSlice.reducer