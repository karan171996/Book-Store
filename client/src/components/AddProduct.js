import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// Css imports
import "./AddProduct.css";

//hook

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editView, setEditView] = useState(false);
  let navigate = useNavigate();
  let urlParams = useParams();
  let [searchParams] = useSearchParams();
  const pageView = Boolean(searchParams.get("edit"));

  useEffect(() => {
    if (pageView) {
      setEditView(true);
      let productId = urlParams?.productId;
      fetchProductDetails(productId);
    }
  }, [pageView, urlParams]);

  const fetchProductDetails = (id) => {
    return axios.get(`/api/admin/edit-product/${id}`).then((res) => {
      let response = res?.data?.product || {};
      setTitle(response.title);
      setImage(response.imageUrl);
      setPrice(response.price);
      setDescription(response.description);
    });
  };
  const getData = () => {
    if (editView) {
      return axios.post("/api/admin/edit-product", {
        productId: urlParams?.productId,
        title,
        image,
        description,
        price,
      });
    } else {
      return axios.post("/api/admin/add-products", {
        title,
        image,
        description,
        price,
      });
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    getData().then((res) => {
      if (res?.status === 200) {
        if (editView) {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
      }
    });
  };
  return (
    <div>
      <form className="product-form" onSubmit={onSubmitHandler}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image Url</label>
          <input
            id="image"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
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
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">
          {editView ? "Update Product" : "Add product"}
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
