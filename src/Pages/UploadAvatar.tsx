import React, { useEffect, useState } from 'react'
interface UploadAvatarProps {
}

export const UploadAvatar:React.FC<UploadAvatarProps> = () => {
    const [avatar, setAvatar] = useState<any>();
    const url = process.env.REACT_APP_BASE_URL_HEROKU as string

    const handleChange=(event:  any) => {
      const file = event.target.files[0]
      file.preview = URL.createObjectURL(file)
      console.log(file);
      setAvatar(file)
    }
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const formData = new FormData();
		  formData.append('avatar', avatar);
      const token = sessionStorage.getItem("token")
      try{
          const requestOptions = {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + token },
              body: formData
          };
          const response = await fetch(`${url}/user/username/avatar`, requestOptions)
          const resJson = await response.json()
          console.log("AAAA",resJson)
      } catch(err) {
          console.log("ERROR", err)
      }}
  return (
    <div>
        <h1>{}Upload Avatar</h1>
        <div>
            <img src={avatar? avatar?.preview : "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"} alt="" style={{width: "100px", height: "100px"}}/>
        </div>
        <form action="" onSubmit={handleSubmit} method="POST">
          <input type="file" id="myFile" name="filename" onChange={handleChange}/>
          <input type="submit"/>
        </form>
    </div>
  )
}
