import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.scss";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/productlist"
      );

      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <h1 className="page-title">Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="description">
              {product.description}
            </p>
            <h4 className="price">₹ {product.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;