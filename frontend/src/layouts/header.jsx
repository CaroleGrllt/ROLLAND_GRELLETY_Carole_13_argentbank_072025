import { Link } from 'react-router-dom'
import Logo from '../assets/img/argentBankLogo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function Header () {

    const isConnected   = true
    const firtName      = 'Tony'

    return (
        <header>
            <nav className='main-nav'>
                <Link to='/' className="main-nav-logo">
                    <img className='main-nav-logo-image' src={Logo} alt=" Argent Bank Logo " />
                    <h1 className='sr-only'>Argent Bank</h1>
                </Link>
                <div className='login__container'>
                    {isConnected ? (
                        <div className='connected__user__container'>
                            <Link className='main-nav-item' to='/profile'>
                                <FontAwesomeIcon icon={faCircleUser} className='circle__connected__user' />
                                {firtName}
                            </Link>
                            <Link className='main-nav-item' to='/'>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout__user' />
                                Sign Out
                            </Link>
                        </div>
                    ):(
                        <div className='not__connected__user__container'>
                            <Link className='main-nav-item' to='/login'>
                                <FontAwesomeIcon icon={faCircleUser} className='circle__user' />
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}