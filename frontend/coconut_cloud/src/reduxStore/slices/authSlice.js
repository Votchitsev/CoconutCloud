import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice(
  {
    name: 'authSlice',
    initialState: {
      isAuth: false
    },
    reducers: {}
  }
)

export default authSlice.reducer
