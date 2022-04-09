import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from '@react-native-async-storage/async-storage'
import { Login, Logout } from '../../services/authService'
export const login = createAsyncThunk('user/login', async (params, { rejectWithValue, getState }) => {
    const email = params?.email;
    const password = params?.password;
    const notiToken = params?.token;
    try {
        const { data } = await Login(email, password, notiToken);
        const token = data?.accessToken;
        await storage.setItem('token', token)
        return { token, data }
    } catch (err) {
        console.log(err)
        if (!err.response) {
            throw err
        }
        rejectWithValue(err.response.message)
    }
})
export const setData = createAsyncThunk('user/set', (params, { rejectWithValue, getState }) => {
    console.log("params", params);
    return params;
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        data: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null
        }

    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            const { token } = action.payload
            state.token = token
        },
        [setData.fulfilled]: (state, action) => {
            console.log(action.payload, "payload");
            state.data = action.payload
        }
    }

})
export const { logout } = userSlice.actions