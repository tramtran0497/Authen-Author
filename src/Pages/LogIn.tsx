import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface LogInProps {}

export const LogIn: React.FC<LogInProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        fetch("https://teetea-api.herokuapp.com/login", requestOptions)
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        })
        .catch(err => console.log("ERROR", err))

         navigate('/'); 
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
                <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} name="password"/>
            </div>

            <button>Log In</button>
        </form>
    </div>
  )
}
