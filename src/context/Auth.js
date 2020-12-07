import { useContext, useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const loginUser = (data) => {
        //TODO: Handle login functionality here
       
            setCurrentUser({
                'name': data.username,
                'isLoggedIn': true,
            });
            window.localStorage.setItem('user', data.username);
            window.location.replace("/todo");
        
        //TODO: Store login info in localstorage (don't store password!)
    }
    return (
        <AuthContext.Provider value={{ currentUser, loginUser }} >
            { children}
        </AuthContext.Provider >
    )
}

