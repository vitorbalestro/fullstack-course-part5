import Toggable from './Toggable'
import CreateNewBlogForm from './Create'
import { useRef } from 'react'

const ToggableCreateNewBlogForm = ({ setNotification, setNotificationType, setRefreshBlogList }) => {

    const createNewBlogFormRef = useRef()

    return (
        <Toggable buttonLabel="create new blog" id='createNewButton' ref={createNewBlogFormRef}>
            <CreateNewBlogForm setNotification={setNotification}
                setNotificationType={setNotificationType} setRefreshBlogList={setRefreshBlogList}
                createNewBlogFormRef={createNewBlogFormRef}/>
        </Toggable>
    )
}

export default ToggableCreateNewBlogForm