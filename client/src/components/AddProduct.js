import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Css imports
import "./AddProduct.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  let navigate = useNavigate();
  const getData = () => {
    return axios.post("/api/admin/add-products", {
      title,
      image,
      description,
      price,
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
        <div className="form-control">
          <label for="image">Image Url</label>
          <input
            id="image"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label for="description">Description</label>
          <textarea
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            cols="40"
          />
        </div>

        <div className="form-control">
          <label for="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add product</button>
      </form>
    </div>
  );
};
export default AddProduct;
