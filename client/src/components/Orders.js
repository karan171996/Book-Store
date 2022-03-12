import { useFetchOrders } from "../api/useFetchOrders";
import "./Orders.css";

const Orders = () => {
  const [orders, loading] = useFetchOrders();
  return (
    <div className="orders-container">
      {orders.length > 0 ? (
        orders.map((item, index) => (
          <div className="order-list" key={index}>
            <div className="order-detail">
              <b>Order - # {item._id}</b>
            </div>
            {item.items.map((product, index) => (
              <div key={index} className="product-list">
                {product.title} ({product.qty})
              </div>
            ))}
          </div>
        ))
      ) : (
        <h2>No Orders Found !!!</h2>
      )}
    </div>
  );
};

export default Orders;
