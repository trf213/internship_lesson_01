import { useState } from 'react'

const Login = () => {

    const [fields, setFields] = useState({
        username: '',
        password: ''
    })


    const handleFieldChange = () => {
        //TODO: Handle input changes
    }

    const handleSubmit = () => {
        //TODO: Handle form submission
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