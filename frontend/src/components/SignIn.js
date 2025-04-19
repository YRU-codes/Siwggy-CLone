import { useState } from "react"
import { useDispatch } from "react-redux";
import axios from "axios";
import { newUser } from "../Store/UserReducer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const[user, setUser] = useState({
        name :'',
        email :'',
        password :'',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e)=>{
        setUser((prev)=>({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = async ()=>{
        console.log(user);
        try{
            const response = await axios.post('http://localhost:3000/newuser', user);
            console.log(response);
            if(response.data.success){
                navigate('/login');
            }
        }catch(e){
            console.log(e);
        }
    }

  return (
    <div className="w-[350px] h-[300px] absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-center text-4xl mb-8 font-semibold text-amber-800">Sign In</h2>
        <div className="my-4">
            <input className="p-2 border w-[100%] outline-amber-600 text-lg" type="text" placeholder="Enter the name" name="name" value={user.userName} onChange={handleChange}/>
        </div>
        <div className="my-4">
            <input className="p-2 border w-[100%] outline-amber-600 text-lg" type="text" placeholder="Enter the email" name="email" value={user.email} onChange={handleChange}/>
        </div>
        <div className="my-4">
            <input className="p-2 border w-[100%] outline-amber-600 text-lg" type="password" placeholder="Enter the password" name="password" value={user.password} onChange={handleChange}/>
        </div>
        
            <button className="w-32 h-10 bg-orange-200 rounded-md hover:border-2 border-amber-600" onClick={handleSubmit}>Sign In</button>
    </div>
  )
}

export default SignIn
