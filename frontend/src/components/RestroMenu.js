import { useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_IMG_URL } from "../Utils";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/CartReducer";
import useRestroMenu from "../Hooks/useRestroMenu";
import RestroCategories from "./RestoCategories";
const RestroMenu = () => {
  let { resId } = useParams();
  const[showIdx, setShowIdx]=useState(0);
  const restroInfo = useRestroMenu(resId);

  if (restroInfo === null) return <>No data found...</>;
  const restroName = restroInfo.cards[0].card.card.text;
  const categories = restroInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((f)=>{
    return f?.card?.card?.["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory';
  })

  const handleClick = (index)=>{
    setShowIdx((prev)=> prev === index ? null : index);
  }

  return (
    <div className="text-center">
      <div>
        <h1 className="my-4 font-medium text-[28px]">{restroName}</h1>
        <h2 className="my-5 text-[22px]">Menu items</h2>
        {categories.map((category, idx)=>(
          <RestroCategories
            key={category?.card?.card?.title}
            data = {category?.card?.card}
            showItems = {idx === showIdx ? true : false}
            setShowIdx = {()=>handleClick(idx)}/>
        ))}
      </div>
    </div>
  );
};

export default RestroMenu;
