import { useContext, createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()
    const userCollectionRef = collection(db, "Users")
    const [currentUserID, setCurrentUserID] = useState()


//////INSERTION DES DONNEES UTILISATEUR DANS LA BASE DE DONNEE ET RECUPERATION DES DONNEES//////
/**/    useEffect(() => {
/**/        const getUser = async () => {
/**/            const data = await getDocs(userCollectionRef);
/**/            setCurrentUser(data.docs.map(doc => ({...doc.data(), id: doc.id})))
/**/        }
/**/
/**/        getUser();
/**/    }, [])
/////////////////////////////////////////////////////////////////////////////////////////////////



//////INSCRIPTION ET CONNEXION//////////////////////////////////////////////////////////////////
/**/    const signup = (auth, email, password) => {
/**/      
/**/        return createUserWithEmailAndPassword(auth, email, password)
/**/    }
/**/
/**/    const signin = (auth, email, password) => {
/**/        return signInWithEmailAndPassword(auth, email, password)
/**/     }
/**/
/**/    useEffect(() => {
/**/
/**/         return onAuthStateChanged(auth, user => {
/**/                if(user){
/**/                    setCurrentUserID(user)
/**/                    
/**/                }
/**/        })
/**/
/**/    }, [])
/////////////////////////////////////////////////////////////////////////////////////////////


    const value = {
        currentUserID,
        signup,
        signin
    }
    
    console.log("donées de l'user : ", currentUser)

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


