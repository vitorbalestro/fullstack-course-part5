import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setNotification, setNotificationType, setUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    // eslint-disable-next-line
      },[])


    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification('Logged in!')
            setNotificationType('success')
            setTimeout(() => {
                setNotification(null)
                setNotificationType(null)
            }, 5000)
        } catch (exception) {
            setNotification('Wrong credentials')
            setNotificationType('error')
            setTimeout(() => {
                setNotification(null)
                setNotificationType(null)
            }, 5000)
        }

    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
            username&nbsp;
                    <input type="text" value={username} id='username'
                        name="Username" onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
            password&nbsp;
                    <input type="password" value={password} id='password'
                        name="Password" onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm