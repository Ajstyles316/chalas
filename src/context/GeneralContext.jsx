import { createContext, useContext } from "react";
import { UserProvider } from "../Firebase/UserContext";
import { CartProvider } from "../Views/Transacciones/context/context";
import { AuthProvider } from "./AuthContext";

const Appcontext = createContext();

export const GeneralContext = ({ children }) => {
      const value = {}; 

    return (
        <Appcontext.Provider value={value}>
            <AuthProvider>
                <UserProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </UserProvider>
            </AuthProvider>
        </Appcontext.Provider>
    );
};

export const useAppcontext = () => useContext(Appcontext);
