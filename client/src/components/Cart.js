import React, { useState, useEffect } from "react";
import { useFetchCartdetails } from "../api/useFetchCartDetail";
import { postCartDetails } from "../api/postDeleteCartItem";
import { postOrder } from "../api/postOrder";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartData, loading] = useFetchCartdetails();
  const navigate = useNavigate();

  useEffect(() => {
    setCart(cartData?.cart ?? []);
  }, [cartData]);

  const deleteHandler = (id) => {
    postCartDetails(id).then(() => {
      window.location.reload();
    });
  };

  const orderHandler = () => {
    postOrder().then(() => {
      navigate("/orders");
    });
  };
  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <div className="cart-items-container">
          {cart.map((item, index) => (
            <div className="single-item" key={index}>
              <div>
                <b>
                  <span>Title : </span>
                  <span>{item?.productId?.title}</span>
                </b>
              </div>
              <div>
                <b>
                  <span>Quantity : </span>
                  <span>{item?.qty}</span>
                </b>
              </div>
              <button onClick={() => deleteHandler(item?.productId?._id)}>
                Delete
              </button>
            </div>
          ))}
          <hr style={{ width: "100%" }} />
          <button onClick={() => orderHandler()}>Order Now!</button>
        </div>
      ) : (
        <h2>No item present inside Cart!!!</h2>
      )}
    </div>
  );
};
export default Cart;
