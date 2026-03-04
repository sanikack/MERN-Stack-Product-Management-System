import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./editProduct.scss";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const showAlert= (icon,message)=>{
     Swal.fire({
        toast: true,
        icon,
        title: message,
        timer: 2000,
        showConfirmButton: false,
        position: "top"
      });
  }

  // Get Single Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      const product = res.data.product;

        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // 🔹 Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        { name, price, category, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     showAlert("success", res.data.message)

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate} className="add-product-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;