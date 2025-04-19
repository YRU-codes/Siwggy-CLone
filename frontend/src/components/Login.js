import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logIn } from "../Store/UserReducer"

const Login = () => {
    const[user, setUser] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        setUser((prev)=>({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = async(event)=>{
        try{
            const resp = await axios.post('http://localhost:3000/login', user);
            console.log('resp data...   ',resp.data);
            const{success, authToken, data} = resp.data;
            if(success){
                localStorage.setItem('authToken', authToken);
                dispatch(logIn(data[0]));
                localStorage.setItem('showLoginToast', 'true');
                navigate('/');
            }
        }catch(e){
            console.log(e);
        }
    }

    const validateUser = () =>{

    }

    return (
    <div className="w-[350px] h-[300px] absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-center text-4xl mb-8 font-semibold text-amber-800">Log In</h2>
        <div className="my-4">
            <input className="p-2 border w-[100%] outline-amber-600 text-lg" type="text" placeholder="Enter the email" name="email" value={user.email} onChange={handleChange}/>
        </div>
        <div className="my-4">
            <input className="p-2 border w-[100%] outline-amber-600 text-lg" type="password" placeholder="Enter the password" name="password" value={user.password} onChange={handleChange}/>
            <div className="max-w-28 mt-3 text-gray-500 ml-3 text-sm hover:font-medium">
                <Link to='/forget-password'>Forget Password?</Link>
            </div>
        </div>
        <div className=" flex justify-between items-center mt-6">
            <button className="w-32 h-10 bg-orange-200 rounded-md hover:border-2 border-amber-600" onClick={handleSubmit}>Log In</button>
            <Link to='/sign-in'>New User?</Link>
        </div>
    </div>
    )
}

export default Login
