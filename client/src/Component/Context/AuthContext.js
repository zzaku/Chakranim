import { useContext, createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, deleteUser } from "firebase/auth"
import { db, auth } from "../Firebase/Firebase";
import { collection, getDocs, addDoc, query, where, updateDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { storage } from "../Firebase/Firebase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";

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
/**/   const userResumeRef = currentUserID && currentUser && currentUser[0] && currentUser[0].id && collection(db, "Users", currentUser[0].id, "Resume")
/**/   const onSnapshotPreferencesRef = currentUserID && currentUser && currentUser[0] && currentUser[0].id && collection(db, "Users", currentUser[0].id, "Preferences")
/**/
/**/   const addInfosUser = async (infos) => {
/**/         await addDoc(userCollectionRef, infos)
/**/         getUser()
/**/     }
/**/
/**/      const getUser = async () => {
/**/               if(userInfosRef){
/**/                  const data = await getDocs(userInfosRef);
/**/                  setCurrentUser(data.docs.map(doc => ({...doc.data(), id: doc.id})))
/**/               }
/**/        }
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
/**/   const getResume = async () => {
/**/          if(userResumeRef){
/**/              const datas = await getDocs(userResumeRef);
/**/              setCurrentUser({...currentUser, Resume: datas.docs.map(doc => ({...doc.data(), id: doc.id}))})
/**/          } else {
/**/              setCurrentUser(null)
/**/          }
/**/      }
/**/
/**/   const addResume = async (data) => {
/**/          await addDoc(userResumeRef, data)
/**/          await getResume()
/**/     }
/**/
/**/   const setResume = async (data, idResume) => {
/**/          const userSetResume = currentUserID && currentUser && currentUser[0] && currentUser[0].id && doc(db, "Users", currentUser[0].id, "Resume", idResume)
/**/          await updateDoc(userSetResume, data)
/**/          getResume()
/**/     }
/**/
/**/   const setInfo = async (data, idUser) => {
/**/          const userSetBio = currentUserID && currentUser && currentUser[0] && currentUser[0].id && doc(db, "Users", idUser)
/**/          await updateDoc(userSetBio, data)
/**/          getUser()
/**/     }
/**/
/**/   const setDisplayInfosUser = async (data, idUser) => {
/**/          const userSetDisplaying = currentUserID && currentUser && currentUser[0] && currentUser[0].id && doc(db, "Users", idUser)
/**/          await updateDoc(userSetDisplaying, data)
/**/          getUser()
/**/     }
/**/
/**/   const setAvatarPath = async (data, idUser) => {
/**/          const userSetAvatarPath = currentUserID && currentUser && currentUser[0] && currentUser[0].id && doc(db, "Users", idUser)
/**/          await updateDoc(userSetAvatarPath, data)
/**/          getUser()
/**/     }
/**/
/**/   const uploadAvatar = async (avatar, path_avatar, uuid) => {   
/**/          const avatarRef = ref(storage, `avatars/${path_avatar + uuid}`)
/**/          await uploadBytes(avatarRef, avatar)
/**/          getUser()
/**/     }
/**/
/**/   const getBackImage = async (path_avatar1, path_avatar2, uuid) => {
/**/          const storage = getStorage();
/**/          const getUrl = getDownloadURL(ref(storage,`avatars/${path_avatar2 + uuid}`)).then(url => url)
/**/          getUser()
/**/          return getUrl
/**/     }
/**/
/**/
/**/    useEffect(() => {
/**/        
/**/              getUser();
/**/              getPref();
/**/              getResume();
/**/
/**/              return () => {
/**/                getUser();
/**/                getPref();
/**/                getResume();
/**/             }
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
/**/        const updateMail = async (email) => {
/**/         await updateEmail(auth.currentUser, email)
/**/        }
/**/
/**/        const updatePass = async (newPassword) => {
/**/         await updatePassword(auth.currentUser, newPassword)
/**/        }
/**/
/**/        const deleteAccount = async (idUser) => {
/**/
/**/          const deleteCurrentUser = doc(db, "Users", idUser)
/**/
/**/          await deleteUser(auth.currentUser)
/**/          await deleteDoc(deleteCurrentUser);
/**/        }
/**/
/**/    useEffect(() => {
/**/
/**/         return onAuthStateChanged(auth, user => {
/**/                if(user){
/**/                    setCurrentUserID(user)
/**/                    getPref()
/**/                    getResume()
/**/
/**/                    return () => {
/**/                      setCurrentUserID(user)
/**/                      getPref()
/**/                      getResume()
/**/                     }
/**/                } else {
/**/                     setCurrentUserID(null)
/**/                     setCurrentUser(null)
/**/
/**/                     return () => {
/**/                       setCurrentUserID(user)
/**/                       getPref()
/**/                       getResume()
/**/                     }
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
        getPref,
        getResume,
        addResume,
        setResume,
        setInfo,
        updateMail,
        updatePass,
        deleteAccount,
        setDisplayInfosUser,
        uploadAvatar,
        getBackImage,
        setAvatarPath,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


