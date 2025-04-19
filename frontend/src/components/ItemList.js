import { useDispatch } from "react-redux"
import { IMGURL } from "../Utils"
import { addItem } from "../Store/CartReducer";
const ItemList = ({items}) => {
    const dispatch = useDispatch();
    console.log(items)
    return (
        <div>
            {items.map((item)=>(
                <div key={item.card.info.id} className="m-2 py-3 border-gray-300 border-b-2 text-left flex justify-between items-center">
                    <div className="w-8/12">
                        <div>
                            <span>{item.card.info.name}</span>
                            <span> - ₹{item.card.info.defaultPrice / 100 || item.card.info.price / 100}</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            {item.card.info.description}
                        </p>
                    </div>
                    <div className="my-1 w-2/12 relative">
                        <img src={IMGURL+item.card.info.imageId} />
                        <button className=" bg-black  w-20 h-6 font-semibold text-green-600 rounded absolute left-5 bottom-0"
                            onClick={()=>dispatch( 
                                addItem ({
                                    id : item.card.info.id,
                                    name : item.card.info.name,
                                    price : item.card.info.price || item.card.info.defaultPrice,
                                })
                            )}
                        >ADD</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ItemList
