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
        state.username = null
      },
      getFromCookie (state, action) {
        state.authToken = action.payload.token
        state.username = action.payload.username
      }
    }
  }
)

export const { login, logout, getFromCookie } = authSlice.actions
export default authSlice.reducer
