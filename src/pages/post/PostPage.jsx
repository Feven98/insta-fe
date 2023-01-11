import { useState, useEffect} from "react"

const PostPage = (props) =>{
    // react state
  const [profile, setProfile] = useState([])

  // fetch endpoint
  const BASE_URL = "http://localhost:4000/post"

  const getPost = async () => {
    try {
        const response = await fetch(BASE_URL)
        // fetch grabs the data from API - (mongo)
        const allPost = await response.json()
        // assuming no errors - translate to JS 
        console.log(allPost)
        setProfile(allPost)
        // store that data (from api) in react state
      } catch (err) {
        console.log(err)
      }
  }
  // useEffect 
  useEffect(() => {
    getPost()
  }, [])
  return<div><h1>Post page</h1></div>
}

export default PostPage