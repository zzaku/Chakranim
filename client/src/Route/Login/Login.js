import { useState } from 'react'
import SignUp from "./signUp/signUp"
import SignIn from "./signIn/signIn"

function Identification({connected, setConnected}){

   const [register, setRegister] = useState(false)   

    return(
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