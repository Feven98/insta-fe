import { getUserToken,setUserToken, clearUserToken } from "../utils/authToken"
import { UserContext} from '../data'
import { useContext } from "react"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"

function Auth(props){

    const {setAuth, setUser} = useContext(UserContext)
    // console.log(setAuth, setUser)
// register form
const registerForm = async (data) => {
    try {

        const configs = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }

        const newUser = await fetch(
            "https://instagraph-p3-be.herokuapp.com/auth/register",
            configs
        )

        const parsedUser = await newUser.json()
        console.log(parsedUser)

        // sets local storage
        setUserToken(parsedUser.token)
        // put the returned user object in state
        setUser(parsedUser.user)
        // setUser(parsedUser.home)
        // adds a boolean cast of the responses isAuthenticated prop
        setAuth(parsedUser.isLoggedIn)

        // alternative (safer) implementation would be to use jwt decode library 
        return parsedUser
    } catch (err) {
        console.log(err)
        clearUserToken();
        setAuth(false);
    }
}
// login form
const loginUser = async (data) => {
    try {
        const configs = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }

        const response = await fetch(
            "https://instagraph-p3-be.herokuapp.com/auth/login",
            configs
        )

        const currentUser = await response.json()
        //console.log(currentUser)

        if (currentUser.token) {
            // sets local storage
            setUserToken(currentUser.token)
            // put the returned user object in state
            setUser(currentUser.user)
            setAuth(currentUser.isLoggedIn)
            setUser(currentUser.home)
            console.log(currentUser)
            return currentUser
        } else {
            throw `Server Error: ${currentUser.statusText}`
        }
    } catch (err) {
        console.log(err)
        clearUserToken();
        setAuth(false);
    }
}

    return (
        <section className="login">
<h1>Login / Register Page</h1>
            <RegisterForm signUp={registerForm}/>
            <LoginForm signIn={loginUser}/>
        </section>
    )
}

export default Auth