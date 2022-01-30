import { useState } from "react";
import axios from "axios";

// Css imports
import "./AddProduct.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");

  const getData = async () => {
    const res = await axios.post("/api/admin/products", {
      title,
    });
    return await res;
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    getData().then((res) => {
      if (res?.data?.res === "success") {
        window.location.href = "http://localhost:3000/";
      }
    });
  };
  return (
    <div>
      <form className="product-form" onSubmit={onSubmitHandler}>
        <div className="form-control">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit">Add product</button>
      </form>
    </div>
  );
};
export default AddProduct;
