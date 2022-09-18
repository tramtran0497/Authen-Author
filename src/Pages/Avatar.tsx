import React, { useEffect, useState } from 'react'
import { UploadAvatar } from './UploadAvatar'
interface AvatarProps {
}

export const Avatar:React.FC<AvatarProps> = () => {
    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"
    const [avatarUrl, setAvatarUrl] = useState(defaultAvatar)
    const [existedAvatar, setExistedAvatar] = useState(false)
    const url = process.env.REACT_APP_BASE_URL_HEROKU as string
    
    const user = JSON.parse(sessionStorage.getItem("user")!)
    const id = user._id
    useEffect(() => {
        const getAvatar = async() => {
            try {
                const response = await fetch(`${url}/user/${id}/avatar`)
                console.log(response.statusText )
                if(response.statusText === "OK"){
                    setAvatarUrl(response.url)
                    setExistedAvatar(true)
                } else{
                    setExistedAvatar(false)
                }
            } catch (e) {
                setAvatarUrl(defaultAvatar)
            }
        }
        getAvatar()
    })

    useEffect(() => console.log("AAAAAA", existedAvatar))
    
  return (
    <div>
        {
            existedAvatar ? (
        <div>
            <h1>Updated Avatar</h1>
            <img src={avatarUrl} alt="avatar"/>
        </div>
            ) : <UploadAvatar/>
        }
    </div>
  )
}
