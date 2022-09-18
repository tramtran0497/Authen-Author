import React, { useEffect, useState } from 'react'
import { UserShowing } from './Home'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../Redux/store'
import { fetchUser } from '../Redux/Slices/userSlice'
import { useAppSelector} from '../Redux/hooks'


interface EditProps {
}

export const Edit:React.FC<EditProps> = () => {
    const [updatedUser, setUpdatedUser] = useState<UserShowing>({
        name: "",
        address: "",
        DOB: "",
        email: "",
        phoneNumber: ""
    });

    const dispatch = useDispatch<AppDispatch>();
    const url = process.env.REACT_APP_BASE_URL_HEROKU as string

    const userInfo = useAppSelector(state => state.user.userInfo)
    


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try{
            const token = sessionStorage.getItem("token")

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + token},
                body: JSON.stringify(updatedUser)
            };
            const response = await fetch(`${url}/user/username`, requestOptions)
            await response.json()
            dispatch(fetchUser())
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(userInfo){
            setUpdatedUser({...updatedUser, name: userInfo.name, address: userInfo.address, email: userInfo.email, phoneNumber: userInfo.phoneNumber, DOB: userInfo.DOB})
        }
    }, [userInfo])
    
  return (
    <div>
        <h1>Edit your profile</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='changing your name' value={updatedUser?.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatedUser({...updatedUser, name: e.target.value})}/>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" placeholder='changing your phone number' value={updatedUser?.phoneNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatedUser({...updatedUser, phoneNumber: e.target.value})}/>
            <label htmlFor="DOB">DOB</label>
            <input type="text" placeholder='changing your DOB' value={updatedUser?.DOB} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatedUser({...updatedUser, DOB: e.target.value})}/>
            <label htmlFor="address">Address</label>
            <input type="text" placeholder='changing your address' value={updatedUser?.address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatedUser({...updatedUser, address: e.target.value})}/>
            <input type="submit" value={"Update"}/>
        </form>
    </div>
  )
}
