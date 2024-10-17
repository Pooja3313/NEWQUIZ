import "./App.css";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import Addtask from "./Components/Addtask/Addtask";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logout } from "./Components/Logout/logout";
import Navbar from "./Components/Navbar/Navbar";
import User from "./Components/User/user";


function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/addtask" element={<Addtask />} />
        <Route path="/user" element={<User />} />
        
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} /> {/* Add ToastContainer */}
    </>
  );
}

export default App;
