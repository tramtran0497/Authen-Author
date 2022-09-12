import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface LogInProps {}

export const LogIn: React.FC<LogInProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const url = "http://localhost:5001/login"
    // const url = "https://teetea-api.herokuapp.com/login"

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            };
            const response = await fetch(url, requestOptions)
            const resJson = await response.json()
            sessionStorage.setItem('token', resJson.token);
            sessionStorage.setItem('user', JSON.stringify(resJson.user));
            navigate('/')
        } catch(err) {
            console.log("ERROR", err)
        }
    }

  return (
    <div>
        <h1>LOG IN</h1>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} name="email"/>
            </div>
            
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} name="password" />
            </div>

            <button>Log In</button>
        </form>
    </div>
  )
}
