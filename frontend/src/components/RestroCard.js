import { IMGURL } from "../Utils";
import vegLogo from '../Imgs/vegLogo.jpg';
function RestroCard({restro}){
    let {info} = restro;
    
    return(
        <div className="w-60 m-5 p-3 border border-gray-200">
            <img alt="restro-logo" className="object-cover w-full h-[180px] rounded-md" src={IMGURL+info.cloudinaryImageId}/>
            <h2 className="text-lg font-normal">{info.name}</h2>
            <p className="text-gray-400">{info.avgRating} Rating {info.sla.slaString}</p>
            <h4 className="text-gray-400">{info.cuisines.join(', ')}</h4>
            <h4 className="text-gray-400">{info.locality}</h4>
        </div>  
    )
}

export function withVegLabel(RestroCard){
    return ({restro}) =>{
        return (
            <div>
                <img className="w-5 absolute left-5" alt="veg-logo" src={vegLogo}/>
                <RestroCard restro = {restro}/>
            </div>
        );
    }
}

export default RestroCard;