import { useState } from "react";
import { Link } from 'react-router-dom'


export default function Form () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    // e.preventDefault()
  };

    return(
        <form onSubmit={handleSubmit}>
            <div className='input-wrapper'>
                <label htmlFor='username'>Username</label>
                <input 
                    id='username' 
                    type='text'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password' 
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className='input-remember'>
                <input 
                    id='remember-me' 
                    type='checkbox' 
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label htmlFor='remember-me'>Remember me</label>
            </div>
            {/* RETIRER LES LINKS !!! */}
            <Link to='/profile'>
                <button>Sign In</button>
            </Link>
        </form>
    )
}