import { useState } from 'react'
import SignUp from "./signUp/signUp"
import SignIn from "./signIn/signIn"
import { useAuth } from '../../Component/Context/AuthContext'
import { Navigate } from 'react-router-dom'

function Identification({connected, setConnected}){

   const [register, setRegister] = useState(false)   
   const {currentUserId} = useAuth()

    return(
        
            currentUserId ?
            <Navigate to="/" />
            :

        <div className='login-container'> 
            {!register ? 
                <SignIn childConnected={connected} childSetConnected={setConnected} setRegister={setRegister}/>
            :
                <SignUp setRegister={setRegister}/>
            }
        </div>
        
    )
}

export default Identification