// src/pages/Auth.jsx
import {Link} from 'react-router-dom'

function Home(props){
    return (
    <section className='welcome'>
        <h2>Welcome to Instagraph Post</h2>
        <p>Sign in to Continue</p>

				{/* Additional branding & content can go here... */}

        <Link to="/auth">Sign Up</Link>
    </section>)
}

export default Home