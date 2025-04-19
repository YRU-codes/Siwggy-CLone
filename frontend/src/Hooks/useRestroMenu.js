import { useEffect, useState } from "react";
import { MENU_API } from "../Utils";
import axios from "axios";
const useRestroMenu = (resId)=>{

    const[restroInfo, setRestroInfo] = useState(null);
    
    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu = async () =>{
        try{
            const data = await axios.get(MENU_API+resId);
            setRestroInfo(data.data.data);
        }catch(e){
            console.log(e);
        }
    }
    return restroInfo;
}

export default useRestroMenu;