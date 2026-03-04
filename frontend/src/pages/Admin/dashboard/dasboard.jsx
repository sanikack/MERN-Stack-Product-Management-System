import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss"
import {Edit, Trash } from "lucide-react"
import Swal from "sweetalert2";

const Dashboard = () => {
    const [products,setProducts]= useState([]);
    const navigate= useNavigate();
    const token= localStorage.getItem("token");
    const role= localStorage.getItem("role");


    const showAlert= (icon,message)=>{
      Swal.fire({
        toast: true,
        icon,
        title: message,
        position:"top",
        showConfirmButton: false,
        timer:2500
      })
    }

    //role protection
    useEffect(()=>{
        if(role !== "admin"){
            navigate("/");
            return
        }
    },[]);

    //fetch the products
    const fetchProducts= async ()=>{
        try{
            const res= await axios.get("http://localhost:5000/api/products",{
              headers:{
                Authorization: `Bearer ${token}`
              }
            });
        setProducts(res.data.products || [])
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        fetchProducts()
    },[])


    //DELETE PRODUCTS

    const handleDelete= async(id)=>{
      const confirmDelete= await Swal.fire({

    title: "Are you sure?",
    text: "This product will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",

      });

      if(confirmDelete.isConfirmed){

      try{
        const res= await axios.delete(`http://localhost:5000/api/products/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });

        showAlert("success", res.data.message)

        //for refresh
      fetchProducts();
      }

      catch(err){
        console.log(err);
      }
    }
    }
  

  return (
  <div className="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <button
      className="AddButton"
      onClick={() => navigate("/admin/add-product")}
    >
      Add Product
    </button>

    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
            <td className="actions-btn">

             {/* EDIT */}
             <button className="edit-btn" onClick={()=> navigate(`/admin/edit/${product._id}`)}>
              <Edit size={18}/>
             </button>

             {/* DELETE */}
             <button className="delete-btn" onClick={()=> handleDelete(product._id)}>
              <Trash size={18}/>
             </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default Dashboard;







// const Dashboard= ()=>{
//     return(
//         <h1>hello admin</h1>
//     )
// }

// export default Dashboard;