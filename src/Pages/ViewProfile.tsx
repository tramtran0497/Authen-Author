import React, { useEffect, useState } from 'react'
import { UserShowing } from './Home'

interface ViewProps {
}

export const View:React.FC<ViewProps> = () => {
    const [user, setUser] = useState<UserShowing>()

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
                    console.log(resJson)
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

    
  return (
    <div>
        <h1>Information User</h1>
        <div>
            <h2>{user?.name}</h2>
            <p>{user?.DOB}</p>
            <p>{user?.address}</p>
            <p>{user?.email}</p>
            <p>{user?.phoneNumber}</p>
        </div>
    </div>
  )
}
