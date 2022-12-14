import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import { Edit } from './EditProfile';
import { UploadAvatar } from './UploadAvatar';
import { View } from "./ViewProfile";

interface HomeProps {}
export interface UserShowing{
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    DOB: string,
    _id?: string, 
}

export const Home:React.FC<HomeProps> = () => {
    const [showing, setShowing] = useState(false)
    const [showingEdit, setShowingEdit] = useState(false)
    const url = process.env.REACT_APP_BASE_URL_HEROKU as string

    // const userInfo= JSON.parse(sessionStorage.getItem("user")!) 

    const [user, setUser] = useState<UserShowing>({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        DOB: "",
    })
    const navigate = useNavigate();

    // fetch User info
    useEffect(()=> {
        const fetchUserData = async() => {
            const token = sessionStorage.getItem("token")
            const requestOptions = {
                headers: { 'Authorization': 'Bearer ' + token},
            };
            try{
                if(token){
                    const data = await fetch(`${url}/user/username`, requestOptions)
                    const resJson = await data.json()
                    setUser({
                        name: resJson.name,
                        email: resJson.email,
                        phoneNumber: resJson.phoneNumber,
                        address: resJson.address,
                        DOB: resJson.DOB,
                    })
                }
            } catch (err) {
                console.log("Error", err)
            }
            
        }
        fetchUserData()
    }, [])

    const handleLogOut = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        navigate('/login'); 
    }

  return (
    <div>
        <h1>Welcome!</h1>
        <button onClick={() => setShowing(!showing)}>View</button>
        {
            showing ? <View /> : null
        }
        <button onClick={() => setShowingEdit(!showingEdit)}>Edit</button>
        {
            showingEdit ? <Edit /> : null
        }
        {/* <UploadAvatar/> */}
        <Avatar/>
        <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
