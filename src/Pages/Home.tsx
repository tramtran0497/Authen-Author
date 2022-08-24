import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface HomeProps {}

export const Home:React.FC<HomeProps> = () => {
    // const [name, setName] = useState("")
    const user = localStorage.getItem("user")
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate('/login'); 
    }

    
  return (
    <div>
        <h1>Welcome, {user} </h1>
        <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
