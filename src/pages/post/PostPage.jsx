import { useState, useEffect} from "react"
import './PostPage.css'
const PostPage = (props) =>{
    // react state
  const [post, setPost] = useState([])

  // fetch endpoint
  const BASE_URL = "https://instagraph-p3-be.herokuapp.com/post"

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
    return post?. map((post)=>{
        return(
            <div key={post._id}>
            <h1>{post.caption}</h1>
            <h2>{post.location}</h2>
            <img src={post.image} />
            </div>
        )
    })
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