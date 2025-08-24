import { useEffect, useState } from "react";
import Account from "../components/Account";
import accountData from '../data/accountData'
import { editUser, getUser } from "../redux/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Profile () {
    const dispatch      = useDispatch()
    const navigate      = useNavigate()
    const isConnected   = useSelector(state => state.login.isConnected)
    const token         = useSelector(state => state.login.token)

    const [editToggle, setEditToggle] = useState(false);
    const [editFirstName, setEditFirstName] = useState('');
    const [editlastName, setEditlastName] = useState('');

    useEffect(() => {
        if (!isConnected) {
            navigate('/') // renvoie vers page d'accueil à la déconnexion ou si on tape /profile
        }
    }, [isConnected, navigate])

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

    const isValidName = (value) => {
    if (!value) return false

    // On enlève espaces au début/fin
    const v = value.trim()

    // Après trim, il ne doit pas être vide
    if (v.length === 0) return false

    // Regex : lettres accentuées + espaces internes + apostrophe + tiret
    return /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(v)
    }
    const handleEdit = (e) => {
        e.preventDefault()

        const firstNameToSend = isValidName(editFirstName) ?  editFirstName : firstName
        const lastNameToSend = isValidName(editlastName) ? editlastName : lastName

        const userData = {
            firstName: firstNameToSend,
            lastName: lastNameToSend,
        }

        dispatch(editUser(userData.firstName, userData.lastName, token))
        setEditFirstName(firstNameToSend)
        setEditlastName(lastNameToSend)
        setEditToggle(false)
    }

    return (
        <>
            <div className="profile-container">
                <section className="header">
                    <h1>Welcome back </h1>
                    {!editToggle ? (
                        <>
                    <h1>{firstName} {lastName}</h1>        
                        <button
                            onClick={() => {
                                setEditFirstName(firstName ?? '')
                                setEditlastName(lastName ?? '')
                                setEditToggle(true)
                            }}
                            className="edit-button"
                            >
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
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => {
                                    setEditFirstName(firstName ?? '')
                                    setEditlastName(lastName ?? '')
                                    setEditToggle(false)
                                }}
                            >
                            Cancel
                            </button>                        
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
        </>
    )
}