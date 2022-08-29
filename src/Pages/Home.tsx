import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface HomeProps {}

export const Home:React.FC<HomeProps> = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
    })
    // fetch User info
    useEffect(()=> {
        const fetchUserData = async() => {
            const token = sessionStorage.getItem("token")

            const requestOptions = {
                headers: { 'Authorization': 'Bearer ' + token},
            };
            try{
                if(token){
                    const data = await fetch(`https://teetea-api.herokuapp.com/user/username`, requestOptions)
                    const resJson = await data.json()
                    setName(resJson.name)
                }
            } catch (err) {
                console.log("Error", err)
            }
            
        }
        fetchUserData()
    }, [])

    // useEffect(()=> console.log(sessionStorage.getItem("user")))
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
