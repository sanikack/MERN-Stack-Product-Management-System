import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addProduct.scss";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token") ;

  const showAlert= (icon,message)=>{
    Swal.fire({
        toast: true,
        icon,
        title: message,
        timer:2500,
        showConfirmButton: false,
        position:"top"
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res= await axios.post(
        "http://localhost:5000/api/products/add",
        { name, price, category, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showAlert("success", res.data.message );

      //redirect
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;