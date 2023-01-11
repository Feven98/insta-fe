import { Routes, Route } from "react-router-dom"
import PostPage from "../pages/post/PostPage"
import Show from "../pages/show/Show"


const Main = () => {
    return (
<main>
<Routes>
      <Route path="/" element={<PostPage/>} />
      <Route path="/post/:id" element={<Show/>} />

</Routes>
</main>
    )
}

export default Main