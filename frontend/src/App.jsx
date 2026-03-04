
import Login from "./pages/User/Login/login"
import Register from "./pages/User/Signup/signUp"
import { Route, Routes } from "react-router-dom"
import Productlist from "./pages/User/ProductList/ProductList"
import Dashboard from "./pages/Admin/dashboard/dasboard"
import AddProduct from "./pages/Admin/addProduct/addProduct"
import EditProduct from "./pages/Admin/editProduct/editProduct"
import ProtectRoute from "./components/ProtectRoute"

function App() {
  return (
    <Routes>
      {/* USER SIDE */}
      <Route path="/" element={ <Login/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/productlist" element={
        <ProtectRoute>
          <Productlist/>
        </ProtectRoute>
       }/>


      {/* ADMIN SIDE */}
      <Route path="/admin/dashboard" element={
        <ProtectRoute>
          <Dashboard/>
        </ProtectRoute>
        }/>
        
      <Route path="/admin/add-product" element={
        <ProtectRoute>
          <AddProduct/>
        </ProtectRoute>
        }/>

      <Route path="/admin/edit/:id" element={
        <ProtectRoute>
          <EditProduct/>
        </ProtectRoute>
        }/>

    </Routes>
  )
}

export default App
