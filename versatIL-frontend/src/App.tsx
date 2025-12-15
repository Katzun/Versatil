import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTasks from "./pages/AddTasks/AddTasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignUp" element={<RegisterPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddTask" element={<AddTasks />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
