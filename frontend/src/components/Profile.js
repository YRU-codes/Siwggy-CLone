import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Store/UserReducer";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email } = useSelector((store) => store.user.loggedUser);
  const [orders, setOrders] = useState([]);
  
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getOrders",{
        headers : {
          email : email
        }
      }
      );
      const { result, success } = response.data;
      if (success) {
        setOrders(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="m-3 text-xl capitalize">{name}</h2>
        <button
        className="m-3 w-36 h-11 bg-red-500 text-white rounded-md text-lg"
        onClick={handleLogout}>Logout</button>
      </div>
      {orders.length > 0
            ? 
      <table className="min-w-full  border border-gray-200 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-orange-200 text-amber-800 text-center">
            <th className="px-4 py-3 ">Sr. No</th>
            <th className="px-4 py-3 ">Food Name</th>
            <th className="px-4 py-3 ">Quantity</th>
            <th className="px-4 py-3 ">Price</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order, idx) => 
            <tr key={order.item_id} className="border-b border-gray-200 hover:bg-gray-100 text-center">
              <Orders idx={idx} order={order} />
            </tr>)
          }
        </tbody>
      </table>
      : ""}
      
    </div>
  );
};

export default Profile;
