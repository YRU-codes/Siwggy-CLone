import { useContext, useEffect, useState } from "react";
import RestroCard,{withVegLabel} from "./RestroCard";
import { Link } from "react-router-dom";
import { FETCH_DATA_API } from "../Utils";
import { ThemeContext } from "../context/themeToggleContext";
import useFetchRestro from "../Hooks/useFetchRestro";
import { ToastContainer, toast } from "react-toastify"
function Body(){
    const [resList, setResList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const[fiterName , setFiterName] = useState("");
    const LabelRestro = withVegLabel(RestroCard);
    const { theme, toggleTheme } = useContext(ThemeContext);


    async function fetchData(){
        try{
            let jsonData = await fetch(FETCH_DATA_API);
            let data = await jsonData.json();
            console.log(data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
            setResList(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setFilteredList(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        }catch(e){
            console.log(e);
        }
    }
    
    useEffect(()=>{
        fetchData();
        if(localStorage.getItem('showLoginToast')){
            toast.success('LogIn Success...',{
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
            });
            localStorage.removeItem('showLoginToast');
        }
    }, [])


    function filterData(){
        let list = resList.filter((res)=>{
            return res.info.name.toLowerCase().includes(fiterName.toLowerCase());
        })
        setFilteredList(list);
        setFiterName("");
    }

    
    return (
        <div className="dark:bg-gray-700">
            <ToastContainer />
            <input className="m-5 pl-3 py-[6px] outline outline-gray-300" type="text" value={fiterName} onChange={(e)=>{
                setFiterName(e.target.value);
            }}/>
            <button className="text-amber-800 bg-orange-50 hover:bg-orange-100 py-1 px-3" disabled={fiterName? false : true} onClick={filterData}>Seach Restaurants</button>
            
            <label htmlFor='theme' className="text-sm ml-6 cursor-pointer dark:text-white">Dark Theme</label>
            <input className="m-2" type="checkbox" id="theme" onChange={toggleTheme}/>
            
            <div className="flex flex-wrap">
                {filteredList.length !==0  ? 

                    (<>{filteredList.map((restaurant)=>(
                        <Link key={restaurant.info.id} to={"/restromenu/"+restaurant.info.id}> 
                            {restaurant.info.veg ? (<LabelRestro restro = {restaurant}/>) : (<RestroCard  restro = {restaurant}/>)} 
                             
                        </Link>
                    ))} </>)
                 : (<>no data found... </>)}
                
            </div>
        </div>
    );
}

export default Body;