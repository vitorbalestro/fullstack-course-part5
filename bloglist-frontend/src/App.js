import { useState } from 'react'
import blogDisplay from './components/Blog'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import DisplayUser from './components/User'
import ToggableCreateNewBlogForm from './components/ToggableCreateForm'

const App = () => {

    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState(null)
    const [refreshBlogList, setRefreshBlogList] = useState(true)

    return (

        <div>
            <h1>Blog List App!</h1>
            <Notification message={notification} notificationType={notificationType} />
            { user === null ?
                <LoginForm setNotification={setNotification} setNotificationType={setNotificationType}
                    setUser={setUser} />
                : <>
                    <DisplayUser user={user} setUser={setUser} setNotification={setNotification} setNotificationType={setNotificationType}/>
                    <ToggableCreateNewBlogForm setNotification={setNotification}
                        setNotificationType={setNotificationType} setRefreshBlogList={setRefreshBlogList} />
                    <blogDisplay.Blogs refreshBlogList={refreshBlogList} setRefreshBlogList={setRefreshBlogList} />
                </>
            }

        </div>
    )
}

export default App