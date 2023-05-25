import React, {
    createContext,
    useState,
    useEffect
} from "react";
import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

// Firebase Configuration Data will be replaced prior to launch
const firebaseConfig = {
    apiKey: "AIzaSyBVNTsKrMLHvOLyFNF-glTTvY1ca9BYhMg",
    authDomain: "lds-printing.firebaseapp.com",
    projectId: "lds-printing",
    storageBucket: "lds-printing.appspot.com",
    messagingSenderId: "672814260591",
    appId: "1:672814260591:web:1603b84d8069db272c889a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const AuthContext = createContext();
const AuthProvider = (props) => {
    const auth = getAuth();
    // user null = loading
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkLogin();
    }, []);

    function checkLogin() {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(true);
                // getUserData();
            } else {
                setUser(false);
                // setUserData(null);
            }
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
