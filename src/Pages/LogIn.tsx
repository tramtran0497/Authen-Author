import React, { useState } from 'react'

interface LogInProps {}

export const LogIn: React.FC<LogInProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

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
        .then(response => setMessage("Successfully logged in!"))
        .catch(err => console.log("ERROR", err))
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
            <div>{message ? message :  ""}</div>
        </form>
    </div>
  )
}
