import { createContext } from "react";


interface Context{
    isAutenticate:boolean,
    setIsAutenticate:(isAutenticate:boolean)=> void
}

export const AuthContext = createContext<Context | undefined>(undefined);