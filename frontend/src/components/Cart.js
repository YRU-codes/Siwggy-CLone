import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import axios from "axios";
import { UseDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify"
import { removeItems } from "../Store/CartReducer";
const Cart = () =>{
    const dispatch = useDispatch();
    let cartItem = useSelector((store)=> store.cart.cartItems);
    const totalCartValue = cartItem.reduce((total, item) => total + (item.price/100) * item.count, 0);

    const handleCheckout = async() =>{
        try{
            let user_emailId = localStorage.getItem('loggedUsrEmail');
            cartItem = cartItem.map(item => ({...item, user_emailId}));
            // const resp = await axios.post('http://localhost:3000/checkout', cartItem);
            if(resp.data.success){
                toast.success('Order placed Successful', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: false,
                });
                dispatch(removeItems());
            }
            
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="flex flex-col justify-center mx-auto mt-2 w-6/12 p-2  gap-2  border rounded-lg text-center">
            <ToastContainer/>
            {
                cartItem.length !== 0 ?(
                    <div>
                        {
                            cartItem.map((item)=> <CartItems key={item.id} item = {item}/>)
                        }
                        <div>
                            <button onClick={handleCheckout}>Checkout</button>
                        </div>
                        <div className="float-right font-bold text-lg my-3 mx-[72px]">Total : ₹ {totalCartValue}</div> 
                    </div>
                ): 
                (
                 <h2>Cart is Empty</h2>   
                )
            }
        </div>
    );
}

export default Cart;