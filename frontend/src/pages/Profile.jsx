import { useEffect, useState } from "react";
import Account from "../components/Account";
import accountData from '../data/accountData'
import { editUser, getUser } from "../redux/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function Profile () {
    const dispatch      = useDispatch()
    const isConnected   = useSelector(state => state.login.isConnected)
    const token         = useSelector(state => state.login.token)

    const [editToggle, setEditToggle] = useState(false);
    const [editFirstName, setEditFirstName] = useState('');
    const [editlastName, setEditlastName] = useState('');

    useEffect(() => {
        if(token) {
            dispatch(getUser(token)) //charge bon user au chargement ou lors changement token
        }
    }, [dispatch, token])

    const firstName = useSelector(state => state.user.firstName)
    const lastName = useSelector(state => state.user.lastName)

    useEffect(() => {
    if (firstName) setEditFirstName(firstName) // charge bonne identité dans section greetings + inputs
    if (lastName) setEditlastName(lastName)
    }, [firstName, lastName]);

    const handleEdit = (e) => {
        e.preventDefault()

        const firstNameToSend = editFirstName || firstName
        const lastNameToSend = editlastName || lastName

        const userData = {
            firstName: firstNameToSend,
            lastName: lastNameToSend,
        }

        console.log(userData.firstName)
        console.log(userData.lastName)

        dispatch(editUser(userData.firstName, userData.lastName, token))
        setEditToggle(false)
    }

    return (
        <>
        { isConnected ? (
            <div className="profile-container">
                <section className="header">
                    <h1>Welcome back </h1>
                    {!editToggle ? (
                        <>
                    <h1>{firstName} {lastName}</h1>        
                        <button onClick={() => setEditToggle(!editToggle)} 
                                className="edit-button">
                                    Edit Name
                        </button>
                        </>
                    ) : ( 
                        <form >
                            <input 
                                type='text'
                                value={editFirstName}
                                placeholder={firstName}
                                onChange={(event) => setEditFirstName(event.target.value)}
                            />
                            <input 
                                type='text'
                                value={editlastName}
                                placeholder={lastName}
                                onChange={(event) => setEditlastName(event.target.value)}
                            />
                            <button onClick={e => handleEdit(e)}>Save</button>
                            <button onClick={() => setEditToggle(false)}>Cancel</button>
                        </form>
                    )}
                </section>
                <section className="accounts">
                    <h2 className="sr-only">Accounts</h2>
                    {accountData.map(account =>
                    <Account
                        key={account.id}
                        title={account.title}
                        amount={account.amount}
                        description={account.description}
                    />
                    )}
                </section>
            </div>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    )
}