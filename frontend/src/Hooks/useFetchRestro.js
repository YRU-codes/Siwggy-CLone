import { useEffect, useState } from "react";
import axios from 'axios';
import { FETCH_DATA_API } from "../Utils";

const useFetchRestro = () =>{
    const[restroData, setRestroData] = useState(null);
    useEffect(()=>{
        getRestroData();
    },[])

    const getRestroData = async () =>{
        try{
            const result = await axios.get(FETCH_DATA_API);
            // console.log('result... ',result.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
            const data = result.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
            setRestroData(data);
        }catch(e){
            console.log(e);
        }
    }
    return restroData;
}


export default useFetchRestro;