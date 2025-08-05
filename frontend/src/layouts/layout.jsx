import { Outlet } from "react-router" 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOGIN_SUCCESS } from '../redux/actions/login.action.jsx';
import { getUser } from '../redux/actions/user.action';
import Header from './header.jsx'
import Footer from "./footer.jsx"

export default function Layout () {

    const dispatch = useDispatch();
    const token = useSelector(state => state.login.token)

    useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken && !token) {
        dispatch({ type: LOGIN_SUCCESS, payload: storedToken })
        dispatch(getUser(storedToken))
    }
    }, [dispatch, token])

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}