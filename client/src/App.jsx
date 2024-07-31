import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import CreateUserForm from "./components/setting";
import LivestockRecordsScreen from "./pages/viewlivestock/LivestockRecordsScreen";
import UpdateMilkProductionScreen from "./pages/UpdateMilkProduction/UpdateMilkProductionScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}>
          {" "}
        </Route>
        <Route path="/login" element={<Login />}>
          {" "}
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          {" "}
        </Route>
        <Route path="/settings" element={<CreateUserForm />}>
          {" "}
        </Route>
        <Route path="/view-livestock"element={<LivestockRecordsScreen/>}></Route> 
<Route path="/update-milk-production" element={<UpdateMilkProductionScreen/>} >   </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
