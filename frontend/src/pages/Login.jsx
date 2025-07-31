import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/Form';

export default function Login() {

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