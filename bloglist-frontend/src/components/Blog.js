import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import getLoggedUserId from '../utils/user'

const incrementLike = async ({ blog }) => {
    const id = blog.id
    const updatedBlog = {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1
    }
    await blogService.update(id, updatedBlog)
}

function compareLikes(blog1, blog2){
    if(blog1.likes < blog2.likes){
        return 1
    }
    if(blog1.likes > blog2.likes){
        return -1
    }
    if(blog1.likes === blog2.likes){
        return 0
    }
}

const handleDelete = async ({ blog }) => {
    if(window.confirm(`Remove blog '${blog.title}' by '${blog.author}'`)){
        const id = blog.id
        await blogService.deleteBlog(id)
    }
}

const RemoveButton = ({ blog, setRefreshBlogList }) => {

    const blogUserId = blog.user.id
    const loggedUserId = getLoggedUserId()

    return (

        loggedUserId === blogUserId ?
            <div>
                <button type="submit" id='deleteButton' onClick={ async () => {
                    await handleDelete({ blog })
                    setRefreshBlogList(true)
                }}>remove</button>
            </div>
            : <>
            </>
    )
}

const ViewButton = ({ setView }) => {
    return (
        <>
            <button className='viewButton' id='viewButton' type="submit" onClick={() => {setView(true)}}>view</button>
        </>
    )
}

const LikeButton = ({ blog, setRefreshBlogList, handleClick }) => {

    return (
        <button className="likeButton" id='likeButton' type="submit" onClick={async () => {
            await handleClick({ blog })
            setRefreshBlogList(true)
        } }>like</button>
    )
}

const Blog = ({ blog, setRefreshBlogList }) => {

    const [view, setView] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (

        view ?
            <div className='blog' style={blogStyle}>
                <div>
                    {blog.title}&nbsp;
                    <button type="submit" id='hideButton' onClick={() => { setView(false) } }>hide</button>
                </div><div>
                    {blog.url}
                </div><div>
                        likes&nbsp;{blog.likes} &nbsp;
                    <LikeButton blog={blog} setRefreshBlogList={setRefreshBlogList} handleClick={incrementLike} />
                </div><div>
                    {blog.author}
                </div><RemoveButton blog={blog} setRefreshBlogList={setRefreshBlogList} />
            </div>
            :
            <div className='blog' style={blogStyle}>
                {blog.title}&nbsp;
                <ViewButton setView={setView} />
            </div>


    )
}

const Blogs = ({ refreshBlogList, setRefreshBlogList }) => {
    const [blogs, setBlogs] = useState([])
    blogs.sort(compareLikes)
    useEffect(() => {
        async function fetchBlogs() {
            const response = await blogService.getAll()
            setBlogs(response)
        }
        fetchBlogs()
        setRefreshBlogList(false)
    // eslint-disable-next-line
  }, [refreshBlogList])

    return(
        <>
            <h2>Blogs</h2>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} setRefreshBlogList={setRefreshBlogList} />
                )}
            </div>
        </>
    )
}

export default { Blogs, Blog, ViewButton, LikeButton }