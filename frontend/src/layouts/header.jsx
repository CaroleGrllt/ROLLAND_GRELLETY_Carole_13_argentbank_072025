import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/img/argentBankLogo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/login.action';

export default function Header () {
    const navigateTo = useNavigate()
    const dispatch = useDispatch()

    const isConnected   = useSelector((state) => state.login.isConnected)
    const firstName     = useSelector(state => state.user.firstName)


    const handleLogout = () => {
        dispatch(logoutUser())
        navigateTo('/')
    }


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
                                {firstName}
                            </Link>
                            <div className='main-nav-item' onClick={handleLogout}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout__user' />
                                Sign Out
                            </div>
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