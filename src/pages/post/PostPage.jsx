import { useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import './PostPage.css'


const PostPage = (props) =>{
    const [user, setUser] = useState([])

    // state to hold formData
    const [newForm, setNewForm] = useState({
        // username: "",
        image: "",
        caption: "",
    })
    const BASE_URL = `https://instagraph-p3-be.herokuapp.com/post`
    const getPost = async () => {
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

    // handleChange function for form
  const handleChange = (e) => {
    console.log(newForm)
    const userInput = { ...newForm }
    // console.log(e.target.username)
    userInput[e.target.name] = e.target.value
    setNewForm(userInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentUser = { ...newForm }
    try {
      const requestOptions = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        //   "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(currentUser)
      }
      console.log(JSON.stringify(currentUser))
      // const response = await fetch(BASE_URL, requestOptions)
      const response = await fetch(BASE_URL, requestOptions)
      const createPerson = await response.json()
      console.log(createPerson)
      setUser([...user, createPerson])
      setNewForm({
        username: "",
        image: "",
        caption: "",
      })
    } catch (err) {
      console.log(err)
    }
  }
  const loaded = () => {
    return(<>
    <section className="createPost-profile">
    <h2>Create a Post Here</h2>
      <form onSubmit={handleSubmit}>
      <div>
            <label htmlFor="image">
              Image
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Enter image URL"
                value={newForm.image}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="caption">
              Caption
              <input
                type="text"
                id="caption"
                name="caption"
                placeholder="Enter caption"
                value={newForm.caption}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="location">
              Location
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                value={newForm.location}
                onChange={handleChange}
              />
            </label>
          <br/>
          <input className="createPost" type="Submit" value="Create a New Post"/>
          </div>
      </form>
    </section>
    <section className="user-list">
    { user?. map((user)=>{
        return(
            <Link key={user._id} to={`/post/${user._id}`}>
            <div className="profile-card">
            <h1>{user.caption}</h1>
            <h2>{user.location}</h2>
            <img src={user.image} />
            </div>
            </Link>
        )
    })
  }
  </section>
    </>
        
    )
  }
  
  // useEffect 
  useEffect(() => {
    getPost()
  }, [])
  const loading = () => (
    <section className="people-list">
      <h1>
        Loading...
        <span>
          <img
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
          />{" "}
        </span>
      </h1>
    </section>
  );


return(
      <div>
        <section className="Profile-list">
      
    {user && user.length ? loaded() : loading()}
      </section>
      </div>
      )
}


export default PostPage

