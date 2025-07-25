import { Outlet } from "react-router" 
import Header from './header.jsx'
import Footer from "./footer.jsx"

export default function Layout () {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}