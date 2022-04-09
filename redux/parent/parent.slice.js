import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { postStudent } from '../../services/studentService';
import { postUser } from '../../services/userService';

export const setParent = createAsyncThunk('parent/set',     (params)=>{
    return params;
})
export const addChildren = createAsyncThunk('parent/addChildren', (params,{ rejectWithValue, getState})=>{
    const state = [...getState().parent?.children];
    state.push(params)
    console.log(state,params)
    return state
})
export const onSubmit = createAsyncThunk('parent/onSubmit', async(params,{rejectWithValue, getState})=>{
   try{
    const user = await postUser(params?.data);
    if(user.status !== 200){
        throw new Error('Invalid')
    }
    const {user_id} = user.data?.result;
    const children = params?.children;
    
    if(children.length >0){
        await Promise.all(children.map(child => postStudent(child,user_id)));
    }
    return params;
   }catch(e){
       Alert.alert("Invalid")
   }
})
export const parentSlice = createSlice({
    name: 'parent',
    initialState: { 
        children: [],
        data:{
            
        },
    },
    reducers: {
        reset:(state)=>{ state.data = {},state.children=[]}
    },
    extraReducers:{
        [setParent.fulfilled]:(state,action) => {
            state.data = action.payload
        },
        [addChildren.fulfilled]:(state,action)=>{
            state.children = action.payload
        }
    }

})

export const {reset} = parentSlice.actions