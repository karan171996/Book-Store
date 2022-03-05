import { useState, useEffect } from "react";
import { useFetchCartdetails } from "../api/useFetchCartDetail";
import { postCartDetails } from "../api/postDeleteCartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartData, loading] = useFetchCartdetails();
  useEffect(() => {
    console.log("cartData", cartData);
    setCart(cartData?.cart ?? []);
  }, [cartData]);

  const deleteHandler = (id) => {
    postCartDetails(id);
  };

  return (
    <div>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <li key={index}>
            <p>
              {item?.productsData?.title}({item?.qty})
            </p>
            <button onClick={() => deleteHandler(item?.productsData?.id)}>
              Delete
            </button>
          </li>
        ))
      ) : (
        <h2>No item present inside Cart!!!</h2>
      )}
    </div>
  );
};
export default Cart;
