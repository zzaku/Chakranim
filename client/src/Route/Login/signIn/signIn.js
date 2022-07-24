import { useContext } from 'react';
import { useState } from 'react';
import { useAuth } from '../../../Component/Context/AuthContext';
import { auth } from '../../../Component/Firebase/Firebase';
import { epContext } from '../../../App';
import { Alert } from '@mui/material';
import '../style/Login.css'

function Connexion({setRegister}){

    const load = useContext(epContext)
    const {signin} = useAuth()
    const [error, setError] = useState("")
    const [userConnect, setUserConnect] = useState({})

    function onChangeUserConnected(e){
        const name = e.target.name;
        const value = e.target.value;
        setUserConnect({...userConnect, [name]: value})
    }

    async function submitConnect(e){
        e.preventDefault()
        try{
            load.setLoading(true)
            setError('')
            await signin(auth, userConnect.pseudo, userConnect.mdp)
        } catch {
            setError("pseudo ou mot de passe incorect")
        }

        load.setLoading(false)
    }

    return(
            <div className="login">
                            <div className="heading">
                            {/*submitted && childConnected.connected ? <div><ToastApprouved/></div>  : submitted && !childConnected.connected ? <div><Toast/></div> : null*/}
                            <div className='error-container' style={{display: "flex", height: "auto", width: "auto"}}>{error && <Alert variant='danger'>{error}</Alert>}</div>
                                <h2>Connexion</h2>
                                <div className="form" style={{height:'auto'}}>
                                    <form onSubmit={submitConnect}>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" placeholder="adresse mail" name="pseudo" onChange={onChangeUserConnected} autoComplete="off"/>
                                        </div>

                                        <div className="input-group input-group-lg">
                                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                            <input type="password" className="form-control" placeholder="Mot de passe" name="mdp" onChange={onChangeUserConnected} autoComplete="off"/>
                                        </div>

                                        <button type="submit" className="float" name="">Se connecter</button>
                                    </form>
                                </div>

                                <div className="container-asking">
                                    <a href={null} onClick={() => setRegister(true)} className='ask-registering' style={{color:"white"}}>Toujours pas inscrit ?</a>
                                    <a href={null} className='ask-forget-password' style={{color:"white"}}>Mot de passe oublié ?</a>
                                </div>
                            </div>
                    </div>
    )
}

export default Connexion