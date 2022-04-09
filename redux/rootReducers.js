import { userSlice } from './user/user.slice'
import { parentSlice } from './parent/parent.slice'
import { combineReducers } from 'redux'
export const rootReducers = combineReducers({
    user: userSlice.reducer,
    parent: parentSlice.reducer
})

