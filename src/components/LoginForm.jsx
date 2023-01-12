import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserToken } from '../utils/authToken'
import { Link } from 'react-router-dom';

const LoginForm = ({ signIn }) => {

// const {id} = useParams()
const token = getUserToken()


    const initialState = { username: "", password: "" }

    const [input, setInput] = useState(initialState)

    const [user,setUser] = useState(initialState)

    const [newForm, setNewForm] = useState(initialState)

    const navigate = useNavigate()


    const BASE_URL = `"https://instagraph-p3-be.herokuapp.com/post`

    const getUser = async () => {
        console.log(BASE_URL)
        try {
            const response = await fetch(BASE_URL)
            // fetch grabs the data from API - (mongo)
            const allUser = await response.json()
            // assuming no errors - translate to JS  
            console.log(allUser)
            setUser(allUser)
            // store that data (from api) in react state
        } catch (err) {
            console.log(err)
        }
    }

   const handleSubmit = async (e) => {
    e.preventDefault()
    const currentUser = { ...newForm }
    try {
      const requestOptions = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(currentUser)
      }
      console.log(JSON.stringify(currentUser))
      // const response = await fetch(BASE_URL, requestOptions)
      const response = await fetch(BASE_URL, requestOptions)
      const createPerson = await response.json()
      setUser([...user, createPerson])
      console.log(user)
      setNewForm({
        username: "",
        password: "",
      })
    } catch (err) {
      console.log(err)
    }
  
    const createdUserToken = await signIn(input)

    if (createdUserToken) {
        console.log(user.username)
        console.log(user)
        console.log(currentUser)
        navigate("/post")
        // navigate(`/user/${user.id}`)
    } else {
        navigate("/")

    }
    setInput(initialState);
    setUser(initialState)


  }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setUser({ ...input, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        getUser()
    }, [])


    return (
        <>
            
            <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name: </label>
                <input
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                />
                <br />
                <br />
              
                <input type="submit" value="Sign In" onSubmit={handleSubmit}/>
                
            </form>
            </div>
        </>
    );
};

export default LoginForm