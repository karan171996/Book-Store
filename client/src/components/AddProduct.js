import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Css imports
import "./AddProduct.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");

  let navigate = useNavigate();
  const getData = () => {
    return axios.post("/api/admin/products", {
      title,
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    getData().then((res) => {
      if (res?.status === 200) {
        navigate("/");
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
