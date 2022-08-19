import Privacy from './AccountComponent/Privacy/Privacy'
import Sidebar from './SidebarComponent/Sidebars/Sidebar'
import { useAuth } from "../../Component/Context/AuthContext"
import { Navigate } from 'react-router-dom'
import './style/Account.css'
import { useState } from 'react'
import Profile from './AccountComponent/Profile/Profile'

const Account = () => {


    const {currentUserID} = useAuth()
    const [navSidebar, setNavSidebar] = useState("")

    return !currentUserID ?
        <Navigate to='/'/>
        :
        (
        <div className="dashboard-container">
            <div className="dashboard">
                <Sidebar setNavSidebar={setNavSidebar} />
                <div className='component-container'>
                    { navSidebar === "privacy-settings" ?
                        <Privacy />
                        :
                        navSidebar === "profile" ?
                        <Profile />
                        :
                        <Profile />
                    }
                </div>
            </div>
        </div>
    )
}

export default Account