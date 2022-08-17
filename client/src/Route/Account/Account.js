import Profile from './AccountComponent/Profile/Profile'
import Sidebar from './SidebarComponent/Sidebars/Sidebar'
import { useAuth } from "../../Component/Context/AuthContext"
import { Navigate } from 'react-router-dom'
import './style/Account.css'

const Account = () => {


    const {currentUserID} = useAuth()

    return !currentUserID ?
        <Navigate to='/'/>
        :
        (
        <div className="dashboard-container">
            <div className="dashboard">
                <Sidebar />
                <div className='component-container'>
                    <Profile />
                </div>
            </div>
        </div>
    )
}

export default Account