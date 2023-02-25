const DisplayUser = ({ user, setUser, setNotification, setNotificationType }) => {

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        setNotification('Succesfully logged out!')
        setNotificationType('success')
        setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
        },5000)
    }

    const name = user.name
    return(
        <div>
            <p>
                {name} logged in&nbsp;
                <button type="submit" onClick={handleLogout}>logout</button>
            </p>
        </div>
    )
}

export default DisplayUser