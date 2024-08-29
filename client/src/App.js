import "./App.css";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import Addtask from "./Components/Addtask/Addtask";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addtask" element={<Addtask />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} /> {/* Add ToastContainer */}
    </>
  );
}

export default App;
