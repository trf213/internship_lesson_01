import { useState, useContext } from 'react'

import { AuthContext } from '../context/Auth'

const Login = () => {

    const { loginUser } = useContext(AuthContext)

    const [fields, setFields] = useState({
        username: '',
        password: ''
    })


    const handleFieldChange = (e) => {
        const { name, value } = e.target
        //TODO: Handle input changes
        
        setFields({ ...fields, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //TODO: Handle form submission

        if(fields.username !== '' && fields.password !== '')
        {
            loginUser(fields);
            setFields({
                username: '',
                password: ''
            });
            
        }

    }

    //NOTE:Successful form submission must require both username and password submitted

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="username" style={{ marginTop: 5 }}>
                    Username
                    <input type="text" name="username" value={fields.username} onChange={handleFieldChange} />
                </label>
                <label htmlFor="password" style={{ marginTop: 5 }}>
                    Password
                    <input type="password" name="password" value={fields.password} onChange={handleFieldChange} />
                </label>
                <div style={{ marginTop: 5 }}>
                    <button type='submit'>Login Now</button>
                </div>

            </form>
        </div>
    )
}

export default Login