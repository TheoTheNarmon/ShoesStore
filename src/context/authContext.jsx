import React, {createContext, useState, useContext, useEffect} from "react";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth debe ser usado por un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const db = getFirestore();

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut= () =>{
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser){
                const userDocRef = doc(db, "Users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists() && userDocSnap.data().rol === 'admin'){
                    setUser({ ...currentUser, rol: 'admin'});
                }else{
                    setUser({ ...currentUser, rol: 'user'})
                }
            }else{
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth, db])

    const value = {
        user,
        loading,
        signup,
        login,
        logOut
    }

    if (loading) {
    return <h1>Cargando...</h1>; 
    }

    return(
        <AuthContext.Provider value ={value}>
            {children}
        </AuthContext.Provider>
    )
}