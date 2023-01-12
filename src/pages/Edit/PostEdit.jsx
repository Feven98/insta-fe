import './PostEdit.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const placeholderImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
function PostEdit(props) {
    const [user, setUser] = useState(null)
    const [editPost, setEditPost] = useState({
        image: "",
        location: "",
        caption: ""
    })

    const navigate = useNavigate()

    const params = useParams()
    const { id } = params

    const URL = `https://instagraph-p3-be.herokuapp.com/post/${id}`

    // console.log("id", id, URL)
    // console.log(`Current Person: ${JSON.stringify(person)}`)

    const handleChange = (e) =>
        setEditPost({ ...editPost, [e.target.name]: e.target.value })


    const updatePost = async (e) => {
        e.preventDefault()
        // console.log(editForm)
        const currentPost = { ...editPost }
        try {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(currentPost)
            }
            const response = await fetch(URL, options)
            const updatedPost = await response.json()

            setUser(updatedPost)
            setEditPost(updatedPost)
            // navigate(`/user/${id}`)
        } catch (err) {
            console.log(err)
            // navigate(URL)
            navigate('/')
        }
    }

    const getNewPost = async () => {
        try {

            const response = await fetch(URL)
            const foundPost = await response.json()

            setUser(foundPost)
            setEditPost(foundPost)

        } catch (err) {
            console.log(err)
        }
    }

    const removePost = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedPost = await response.json()
            // console.log(deletedPerson)
            // navigate(`/post/${id}`)

            // navigate will change the browser's URL
            // which will cause react-router to "redirect" to home page;
            // the Main will then re-render the People component
            // upon mount People will fetch the updated index of people data

        } catch (err) {
            console.log(err)
            // navigate(URL)
            navigate('/post')
        }
    }

    useEffect(() => {
        getNewPost()
    }, [])

    const loaded = () => (
        <>
            <section>
                <div className='editForm'>
                    <img src={user.image || placeholderImage} />
                    <h1>{user.caption}</h1>
                    <h1>{user.post}</h1>
                    <h1>{user.location}</h1>
                </div>
                {/* <div className='edit'>
                <p>Edit Post</p>
                <button onClick={removePost}>Edit</button>
                </div> */}
            </section>
            <section className='editFormData'>
                <h2>Edit Post</h2>
                <form onSubmit={updatePost}>
                    <div>
                        <label htmlFor="image">
                            Image
                            <input
                                type="text"
                                value={editPost.image}
                                name="image"
                                placeholder="image URL"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="caption">
                            Caption
                            <input
                                type="text"
                                value={editPost.caption}
                                name="caption"
                                placeholder="caption"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="location">
                            Location
                            <input
                                type="text"
                                value={editPost.location}
                                name="location"
                                placeholder="location"
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <input type="submit" value="Update Post" />
                </form>
            </section>
        </>


    )


    const loading = () => (
        <>
            <h1>
                Loading...
            </h1>
        </>
    );
    return (
        <div>{user ? loaded() : loading()}</div>
    )
}

export default PostEdit