import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAuthContext = () =>{
    const context = useContext(AuthContext);
    if(!context)  {
       throw new Error('Debes utilizar el contexto dentro del provider')
    }
    return context
}
export default useAuthContext