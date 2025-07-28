import { useState } from "react";
import Account from "../components/Account";
import accountData from '../data/accountData'


export default function Profile () {
    let firstName = 'Tony'
    let name = 'Jarvis'

    const [editToggle, setEditToggle] = useState(false);
    const [editFirstName, setEditFirstName] = useState({firstName}) // le contenu actuel à éditer
    const [editName, setEditName] = useState({name}) // le contenu actuel à éditer

    const handleEdit = (e) => {
        e.preventDefault()
        const userData = {
            firstName: editFirstName,
            name: editName,
        }

        console.log(userData)

        setEditToggle(false)

    }

    return (
        <div className="profile-container">
            <section className="header">
                <h1>Welcome back </h1>
                {!editToggle ? (
                    <>
                <h1>{firstName} {name}</h1>        
                    <button onClick={() => setEditToggle(!editToggle)} 
                            className="edit-button">
                                Edit Name
                    </button>
                    </>
                ) : ( 
                    <form >
                        <input 
                            type='text'
                            placeholder={firstName}
                            onChange={(event) => setEditFirstName(event.target.value)}
                        />
                        <input 
                            type='text'
                            placeholder={name}
                            onChange={(event) => setEditName(event.target.value)}
                        />
                        <button onClick={e => handleEdit(e)}>Save</button>
                        <button>Cancel</button>
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
    )
}