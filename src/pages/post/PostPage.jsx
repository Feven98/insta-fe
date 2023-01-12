import { useState, useEffect} from "react"
import { Link } from "react-router-dom";
import './PostPage.css'
const PostPage = (props) =>{

    // const token = getUserToken()
    // react state
  const [post, setPost] = useState([])
  const [newPost, setNewPost] = useState({
    image: "",
    caption: "",
    location: "",
  });
  // fetch endpoint
  const BASE_URL = "https://instagraph-p3-be.herokuapp.com/post"
// react state data hold

  const getPost = async () => {
    try {
        const response = await fetch(BASE_URL)
        // fetch grabs the data from API - (mongo)
        const allPost = await response.json()
        // assuming no errors - translate to JS 
        console.log(allPost)
        setPost(allPost)
        // store that data (from api) in react state
      } catch (err) {
        console.log(err)
      }
  }

  // Creating handlechabge for the form
  const handleChange = (e) => {

    const userInput = {...newPost}
    // console.group(e.target.name, e.target.value)
    userInput [e.target.name]= e.target.value
    setNewPost(userInput)
    // setNewPost({ ...newPost, [e.target.name]: e.target.value });
}

 // Creating handle submit for the form
 const handleSubmit = async (e) => {
    e.preventDefault()
    // capturing our local state
    const currentState = {...newPost}
    try{
        const requestOptions = {
            method: "POST",
            header: {
              "Content-Type" : "application/json",
            //   "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(currentState)
    }
    console.log(JSON.stringify(currentState))
        const response = await fetch(BASE_URL, requestOptions)
        console.log(BASE_URL,requestOptions )
         // fetch grabs the data from API - (mongo)
        const createPost = await response.json()
        console.log(createPost)
    setPost([...post, createPost])
    // reset new post state
    setNewPost({
        image: "",
      caption: "",
      location: "",
      })
    }catch(err){
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
                value={newPost.image}
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
                value={newPost.caption}
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
                value={newPost.location}
                onChange={handleChange}
              />
            </label>
          <br/>
          <input className="createPost" type="Submit" value="Create a New Post"/>
          </div>
      </form>
    </section>
    <section className="user-list">
    { post?. map((post)=>{
        return(
            <Link key={post._id} to={`/post/${post._id}`}>
            <div className="profile-card">
            <h1>{post.caption}</h1>
            <h2>{post.location}</h2>
            <img src={post.image} />
            </div>
            </Link>
        )
    })
  }
  </section>
    </>
        
    )
  }
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
  // useEffect 
  useEffect(() => {
    getPost()
  }, [])
  return(
  <div>
    <section className="Profile-list">
  
{post && post.length ? loaded() : loading()}
  </section>
  </div>
  )
}

export default PostPage