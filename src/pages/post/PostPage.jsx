import { useState, useEffect} from "react"
import './PostPage.css'
const PostPage = (props) =>{
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

  const loaded = () => {
    return(<>
    <section className="createPost-profile">
    <h2>Create a Post Here</h2>
      <form>
      <div>
            <label htmlFor="image">
              Image
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Enter image URL"
                value={newPost.image}
                // onChange={handleChange}
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
                // onChange={handleChange}
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
                value={newPost.comment}
                // onChange={handleChange}
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
            <div key={post._id}>
            <h1>{post.caption}</h1>
            <h2>{post.location}</h2>
            <img src={post.image} />
            </div>
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