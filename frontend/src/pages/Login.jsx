import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/Form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router';



export default function Login() {

    const isConnected = useSelector((state)=> state.loginReducer)
      

    return (
        <section className="sign-in-container">
            <article>
                <FontAwesomeIcon icon={faCircleUser} />
                <h1>Sign In</h1>
                <Form />
            </article>
        </section>
    )
}