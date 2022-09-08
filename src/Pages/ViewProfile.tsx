import React, { useEffect, useState } from 'react'
import { fetchUser } from '../Redux/Slices/userSlice'
import { UserShowing } from './Home'
import { useAppSelector, useAppDispatch } from '../Redux/hooks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../Redux/store'

interface ViewProps {
}

export const View:React.FC<ViewProps> = () => {
    const [user, setUser] = useState<UserShowing>({
        name: "",
        address: "",
        DOB: "",
        email: "",
        phoneNumber: ""
    })
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useAppSelector(state => state.user.userInfo)
    useEffect(()=> {
        const token = sessionStorage.getItem("token")
        if(token){
            dispatch(fetchUser())
        }
        // const fetchUserData = async() => {
        //     const token = sessionStorage.getItem("token")

        //     const requestOptions = {
        //         headers: { 'Authorization': 'Bearer ' + token},
        //     };
        //     try{
        //         if(token){
        //             const data = await fetch(`https://teetea-api.herokuapp.com/user/username`, requestOptions)
        //             const resJson = await data.json()
        //             setUser({
        //                 name: resJson.name,
        //                 email: resJson.email,
        //                 phoneNumber: resJson.phoneNumber,
        //                 address: resJson.address,
        //                 DOB: resJson.DOB,
        //             })
        //         }
        //     } catch (err) {
        //         console.log("Error", err)
        //     }
            
        // }
        // fetchUserData()
    }, [dispatch])

    useEffect(() => {
        if(userInfo){
            setUser(userInfo)
        }
    },[userInfo])
    
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
