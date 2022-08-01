import { useContext, createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { db, auth } from "../Firebase/Firebase";
import { collection, getDocs, addDoc, query, where, updateDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    
  
  ////////local storage currentUserID
  const userAccount = localStorage.user;
  const [currentUserID, setCurrentUserID] = useState(userAccount ? JSON.parse(userAccount) : {apiKey: "", appName: "", createdAt: "", email: "", emailVerified: null, isAnonymous: null, lastLoginAt: "", providerData: [], stsTokenManager: {}, uid: ""})
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUserID));
  }, [currentUserID]);
  ///////////////////////////////////////////////////////////
  
  ////////local storage currentUserID
  const userAccountInfos = localStorage.userInfos;
  const [currentUser, setCurrentUser] = useState(userAccountInfos ? JSON.parse(userAccountInfos) : null)
  
  useEffect(() => {
    localStorage.setItem("userInfos", JSON.stringify(currentUser));
  }, [currentUser]);
  ///////////////////////////////////////////////////////////
  
  
//////////INSERTION DES DONNEES UTILISATEUR DANS LA BASE DE DONNEE ET RECUPERATION DES DONNEES//////
/**/
/**/   const userCollectionRef = collection(db, "Users")
/**/   const userInfosRef = currentUserID && query(collection(db, "Users"), where("mail", "==", currentUserID.email)) 
/**/   const userPreferencesRef = currentUserID && currentUser && currentUser[0] && currentUser[0].id && collection(db, "Users", currentUser[0].id, "Preferences")
/**/   const onSnapshotPreferencesRef = currentUserID && currentUser && currentUser[0] && currentUser[0].id && collection(db, "Users", currentUser[0].id, "Preferences")
/**/
/**/   const addInfosUser = async (infos) => {
/**/         await addDoc(userCollectionRef, infos)
/**/     }
/**/
/**/   const getPref = async () => {
/**/          if(userPreferencesRef){
/**/              const datas = await getDocs(userPreferencesRef);
/**/              setCurrentUser({...currentUser, Preferences: datas.docs.map(doc => ({...doc.data(), id: doc.id}))})
/**/          } else {
/**/              setCurrentUser(null)
/**/          }
/**/      }
/**/
/**/   const addPreferences = async (data) => {
/**/          await addDoc(userPreferencesRef, data)
/**/          getPref()
/**/     }
/**/
/**/   const setPreferences = async (data, idPref) => {
/**/          const userSetPreferencesRef = currentUserID && currentUser && currentUser[0] && currentUser[0].id && doc(db, "Users", currentUser[0].id, "Preferences", idPref)
/**/          await updateDoc(userSetPreferencesRef, data)
/**/          await onSnapshot(userSetPreferencesRef, async (doc) => {
/**/              if(doc.data()){
/**/                  if(doc.data().favorite === false && doc.data().to_watch_later === false){
/**/                      await deleteDoc(userSetPreferencesRef);
/**/                           getPref()
/**/                  }
/**/              }
/**/          });
/**/          getPref()
/**/
/**/     }
/**/
/**/
/**/    useEffect(() => {
/**/        const getUser = async () => {
/**/               if(userInfosRef){
/**/                  const data = await getDocs(userInfosRef);
/**/                  setCurrentUser(data.docs.map(doc => ({...doc.data(), id: doc.id})))
/**/               }
/**/        }
/**/              getUser();
/**/              getPref()
/**/
/**/    }, [currentUserID])
/////////////////////////////////////////////////////////////////////////////////////////////////



//////SIGNUP, LOGIN AND LOGOUT//////////////////////////////////////////////////////////////////
/**/    const signup = async (auth, email, password) => {
/**/      
/**/        const fetchSignup = await createUserWithEmailAndPassword(auth, email, password)
/**/            return fetchSignup
/**/        }
/**/
/**/        const signin = async (auth, email, password) => {
/**/            const fetchSignin = await signInWithEmailAndPassword(auth, email, password)
/**/            return fetchSignin
/**/        }
/**/
/**/        const signout = async () => {
/**/          const fetchSignout = await signOut(auth)
/**/          return fetchSignout
/**/        }
/**/
/**/    useEffect(() => {
/**/
/**/         return onAuthStateChanged(auth, user => {
/**/                if(user){
/**/                    setCurrentUserID(user)
/**/                    getPref()
/**/                } else {
/**/                     setCurrentUserID(null)
/**/                     setCurrentUser(null)
/**/                }
/**/        })
/**/
/**/    }, [])
/////////////////////////////////////////////////////////////////////////////////////////////


    const value = {
        currentUserID,
        setCurrentUserID,
        currentUser,
        setCurrentUser,
        signup,
        signin,
        signout,
        addInfosUser,
        addPreferences,
        setPreferences,
        getPref
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


