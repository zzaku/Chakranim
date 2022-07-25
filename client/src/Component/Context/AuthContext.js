import { useContext, createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../Firebase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    
    const userCollectionRef = collection(db, "Users")
    
////////local storage currentUserID
  const userAccount = localStorage.user;
  const [currentUserID, setCurrentUserID] = useState(userAccount ? JSON.parse(userAccount) : {apiKey: "", appName: "", createdAt: "", email: "", emailVerified: null, isAnonymous: null, lastLoginAt: "", providerData: [], stsTokenManager: {}, uid: ""})
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUserID));
  }, [currentUserID]);
///////////////////////////////////////////////////////////

////////local storage currentUserID
  const userAccountInfos = localStorage.userInfos;
  const [currentUser, setCurrentUser] = useState(userAccountInfos ? JSON.parse(userAccountInfos) : {})
  
  useEffect(() => {
    localStorage.setItem("userInfos", JSON.stringify(currentUser));
  }, [currentUser]);
///////////////////////////////////////////////////////////


//////INSERTION DES DONNEES UTILISATEUR DANS LA BASE DE DONNEE ET RECUPERATION DES DONNEES//////
/**/
/**/   const addInfosUser = async (infos) => {
/**/         await addDoc(userCollectionRef, infos)
/**/     }
/**/
/**/    useEffect(() => {
/**/        const getUser = async () => {
/**/            const data = await getDocs(userCollectionRef);
/**/            setCurrentUser(data.docs.map(doc => ({...doc.data(), id: doc.id})))
/**/        }
/**/
/**/        getUser();
/**/    }, [currentUserID])
/////////////////////////////////////////////////////////////////////////////////////////////////



//////INSCRIPTION ET CONNEXION//////////////////////////////////////////////////////////////////
/**/    const signup = async (auth, email, password) => {
/**/      
/**/        const fetchSignup = await createUserWithEmailAndPassword(auth, email, password)
/**/        return fetchSignup
/**/    }
/**/
/**/    const signin = async (auth, email, password) => {
/**/        const fetchSignin = await signInWithEmailAndPassword(auth, email, password)
/**/        return fetchSignin
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
        signin,
        addInfosUser
    }
    
    console.log("donées de l'user : ", currentUser)

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


