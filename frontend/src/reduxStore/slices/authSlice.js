import { createSlice } from '@reduxjs/toolkit'
import { getDataFromStorage, addDataToStorage, removeDataFromStorage } from '../../localStorage/storage'

const authSlice = createSlice(
  {
    name: 'authSlice',
    initialState: {
      sessionId: null
      // authToken: getDataFromStorage().token ? getDataFromStorage().token : null,
      // username: getDataFromStorage().username ? getDataFromStorage().username : null
    },
    reducers: {
      login (state, action) {
        state.sessionId = action.payload.token

        // addDataToStorage({
        //   token: state.authToken,
        //   username: state.username
        // })
      },
      logout (state) {
        state.sessionId = null
        state.username = null

        // removeDataFromStorage()
      },
      setSessionId (state, action) {
        state.sessionId = action.payload
      }
    }
  }
)

export const { login, logout, getFromCookie, setSessionId } = authSlice.actions
export default authSlice.reducer
