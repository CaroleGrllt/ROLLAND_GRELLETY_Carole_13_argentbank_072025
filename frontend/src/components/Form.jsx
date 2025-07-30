import { useState, useRef } from "react";
import { useDispatch } from 'react-redux'
import { loginUser } from "../redux/actions/login.action";
import { useNavigate } from "react-router";

export default function Form () {
    const form = useRef()
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch()
    const navigateTo = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = form.current.username?.value
        const password = form.current.password?.value
        const rememberMe = form.current['remember-me']?.checked

        
        if (!username && !password) {
            setErrorMessage("Username and password are required.")
            return;
        }
        if (!username) {
            setErrorMessage("Username is required.")
            return;
        }
        if (!password) {
            setErrorMessage("Password is required.")
            return;
        }

        try {
            await dispatch(loginUser(username, password, rememberMe))
            setErrorMessage('')
            navigateTo('/profile')
        } catch (err) {
            console.error(err.message)
            setErrorMessage(err.message)
        }
    }
    return(
        <form ref={form} onSubmit={handleSubmit}>
            <div className='input-wrapper'>
                <label htmlFor='username'>Username</label>
                <input 
                    id='username' 
                    type='text'
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password' 
                    type='password'
                />
            </div>
            <div className='input-remember'>
                <input 
                    id='remember-me' 
                    type='checkbox' 
                />
                <label htmlFor='remember-me'>Remember me</label>
            </div>
            <button type="submit">Sign In</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
    )
}