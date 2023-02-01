import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice(
  {
    name: 'authSlice',
    initialState: {
      authToken: null,
      username: null
    },
    reducers: {
      login (state, action) {
        state.authToken = action.payload.token
        state.username = action.payload.username
      },
      logout (state) {
        state.authToken = null
      }
    }
  }
)

export const { login } = authSlice.actions
export default authSlice.reducer
