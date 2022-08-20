import React, { useEffect, useState } from 'react'

interface RegisterProps {
}

interface User{
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    password: string,
    DOB: string,
    isAdmin: boolean,
}

export const Register :React.FC<RegisterProps> = () => {
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        DOB: "",
        isAdmin: false,
    });


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        fetch('https://teetea-api.herokuapp.com/users', requestOptions)
        // fetch('http://localhost:5001/users', requestOptions)
        .then(response => response.json())
        .then(response =>console.log("RES",response))
        .catch(err => console.log(err))
    }

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder='name' name="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                <br />
            </div>
            
            <div>
                <label htmlFor="name">Email</label>
                <input type="text" placeholder='email' name="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                <br />
            </div>
            
            <div>
                <label htmlFor="name">Phone Number</label>
                <input type="text" placeholder='phoneNumber' name="phoneNumber" value={user.phoneNumber} onChange={(e) => setUser({...user, phoneNumber: e.target.value})}/>
                <br />  
            </div>
            
            <div>
                <label htmlFor="name">Address</label>
                <input type="text" placeholder='address' name="address" value={user.address} onChange={(e) => setUser({...user, address: e.target.value})}/>
                <br />
            </div>
            
            <div>
                <label htmlFor="name">Password</label>
                <input type="password" placeholder='password' name="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                <br /> 
            </div>
            
            <div>
                <label htmlFor="name">DOB</label>
                <input type="text" placeholder='DOB' name="DOB" value={user.DOB} onChange={(e) => setUser({...user, DOB: e.target.value})}/>
                <br />
            </div>
            
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register