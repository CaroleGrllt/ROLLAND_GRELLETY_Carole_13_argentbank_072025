import { useState } from "react";
import useDispatch from 'react-redux'

export default function Form () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault()
  };

    return(
        <form onSubmit={handleSubmit}>
            <div className='input-wrapper'>
                <label htmlFor='username'>Username</label>
                <input 
                    id='username' 
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password' 
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='input-remember'>
                <input 
                    id='remember-me' 
                    type='checkbox' 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor='remember-me'>Remember me</label>
            </div>
            <button type="submit">Sign In</button>
        </form>
    )
}