import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface HomeProps {}

export const Home:React.FC<HomeProps> = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate();

    useEffect(()=> {
        const user = JSON.parse(sessionStorage.getItem("user")!)
        setName(user.name)
    }, [])

    const handleLogOut = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        navigate('/login'); 
    }

  return (
    <div>
        <h1>Welcome, {name} </h1>
        <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
