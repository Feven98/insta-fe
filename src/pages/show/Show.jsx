import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUserToken } from '../../utils/authToken'
import './Show.css'

const Show = (props) => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = getUserToken()
    const { id } = useParams()
    // create navigate

    const navigate = useNavigate()

    // define some local variable
    const URL = `https://instagraph-p3-be.herokuapp.com/post/${id}`

    const getPost = async () => {
        try {
          const response = await fetch(URL)
          const result = await response.json()
          console.log(result)
            setProfile(result)
            setLoading(false)
         
        } catch (err) {
          console.log(err)
        }
      } 

// function for removepost
const removePost = async (e) => {
  try{
    const options = {
      method:"DELETE",
      header:{
        // Authorization: `Bearer ${token}`
        'Authorization': `Bearer ${token}`,
        'Accept' : 'application/json',
          "Content-Type": "application/json"
      }
    }
    const response = await fetch(URL, options)
    console.log(response)
    const deletePost = await response.json()
    console.log(deletePost)
    // navigate("/")
    navigate(-1);
  } catch(err){
    console.log(err)
    // navigate(URL)
  }
}

      // make a fetch
      const isLoading = () => (<h2>...loading</h2>)
      const loaded = () =>{
        return(
            <>
        <div className="profile-card">
              <img src={profile.image} />
              <h1>{profile.caption}</h1>
              <h1>{profile.post}</h1>
              <h1>{profile.comment}</h1>
              
            </div>
            {/* <div className='delete'> */}
                {/* <p>Edit Post</p>
                <button onClick={removePost}>Edit</button>
                </div> */}
                <div className='delete'>
                <p>Delete Post</p>
                <button onClick={removePost}>Delete</button>
                </div>
            <Link to="/">Back To HomePage</Link>
            </>
        )
      }
      useEffect(() => {
        getPost()
      }, [])
    //   console.log(`current person: ${user._id}`)
      return <section className='showContainer'>
         {/* {loading ? <h2>...loading</h2>:<h2>caption: {profile.caption}</h2>} */}
         {loading ? isLoading(): loaded()}
        </section> 
}
export default Show