import Account from "../components/Account";
import accountData from '../data/accountData'


export default function Profile () {
    return (
        <div className="profile-container">
            <section className="header">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <button className="edit-button">Edit Name</button>
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