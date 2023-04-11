import { useContext } from "react"
import Login from "./Login"
import { AuthContext } from "../../Contexts/AuthContext"
import Home from "./Home"

export default props => {

    const {user} = useContext(AuthContext)

    return(
        !user ? <Login/> : <Home/>
    ) 
}