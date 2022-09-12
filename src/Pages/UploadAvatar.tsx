import React, { useEffect, useState } from 'react'
interface UploadAvatarProps {
}

export const UploadAvatar:React.FC<UploadAvatarProps> = () => {
    const [avatar, setAvatar] = useState("");

    const handleChange=(event: any) => {
      const file = event.target.files[0]
      console.log(URL.createObjectURL(file));
      setAvatar(URL.createObjectURL(file))
      
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log(event)
    }
  return (
    <div>
        <h1>Upload Avatar</h1>
        <div>
            <img src={avatar? avatar : "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"} alt="" style={{width: "100px", height: "100px"}}/>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input type="file" id="myFile" name="filename" onChange={handleChange}/>
          <input type="submit"/>
        </form>
    </div>
  )
}
