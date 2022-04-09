import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getData } from "../services/authService";
import { setData } from '../redux/user/user.slice'
import Default from "./Default";
import Teacher from "./Teacher";
import Parent from "./Parent";
import Driver from "./Driver";
import Boss from "./Boss";
export default function MyStack() {
    const { token } = useSelector(state => state.user)
    console.log('state',useSelector(state=>state.user));
    const [auth, setAuth] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            getData(token).then(result => {
                dispatch(setData(result.data));
                setAuth(result.data?.auth)
            }).catch(err => {
                console.log(err)
            })
        } else {
            setAuth({})
        }
    }, [dispatch,token])
    useEffect(() => console.log("auth",auth), [auth])
    if (auth.auth_id === 1) {
        return <Parent />
    } else if (auth.auth_id === 2) {
        return <Teacher />
    } else if (auth.auth_id === 3) {
        return <Driver />
    } else if (auth.auth_id === 4) {
        return <Boss />
    }
    return <Default />
}