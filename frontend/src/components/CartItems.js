import { useDispatch } from "react-redux";
import { addItem, decreaseQuantity } from "../Store/CartReducer";

const CartItems = ({item}) =>{
    const { name, price, count} = item;
    const dispatch = useDispatch();

    const itemQuantity = (e) =>{
        if(e.target.name === 'increase'){
            dispatch(addItem(item));
        }else if(e.target.name === 'decrease'){
            dispatch(decreaseQuantity(item));
        }   
    }

    return(
        <div className="flex items-center justify-evenly">
                <p className="font-medium text-gray-800 w-6/12">{name}</p>
                <div className="w-3/12">
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100" name="decrease" onClick={itemQuantity}>-</button>
                    <span className="px-3 py-1 text-gray-800">{count}</span>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100" name="increase" onClick={itemQuantity}>+</button>
                </div>
                <p className="font-medium text-gray-800 w-3/12">₹ {(price/100) * count}</p>
        </div>
    );
}

export default CartItems;