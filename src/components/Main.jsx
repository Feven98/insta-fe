import { Routes, Route } from "react-router-dom"
import PostEdit from "../pages/Edit/PostEdit"
import PostPage from "../pages/post/PostPage"
import Show from "../pages/show/Show"


const Main = () => {
    return (
<main>
<Routes>
      <Route path="/" element={<PostPage/>} />
      <Route path="/post/:id" element={<Show/>} />
      <Route path="/post/:id/edit" element={<PostEdit/>} />

</Routes>
</main>
    )
}

export default Main