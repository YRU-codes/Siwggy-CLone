import React from "react";

const Orders = ({ order, idx }) => {
  /*
    user_emailId : 'raju@gmail.com',
      item_id : 137413465,
      price :   369,
      quantity: 1,
      item_name : 'Hunan Paneer Dry' */
  return (
      <>
        <td className="px-4 py-3">{idx + 1}</td>
        <td className="px-4 py-3">{order.item_name}</td>
        <td className="px-4 py-3">{order.quantity}</td>
        <td className="px-4 py-3">{order.price}</td>
      </>
  );
};

export default Orders;
