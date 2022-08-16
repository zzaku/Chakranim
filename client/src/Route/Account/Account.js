import Profile from './AccountComponent/Profile/Profile'
import Sidebar from './SidebarComponent/Sidebars/Sidebar'
import './style/Account.css'

const Account = () => {


    return (
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