import { Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import DonorDashboard from "./components/donor_dashboard";
import DonorRegister from "./components/donor_register";
import Home from "./components/home";
import HospitalDashboard from "./components/hospital_dashboard";
import HospitalRegister from "./components/hospital_register";
import Login from "./components/login";
import NavBar from "./components/nav_bar";
import Request from "./components/requests";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/hospital-register" element={<HospitalRegister />} />
        <Route path="/request-blood" element={<Request />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <ButtonGradient />
    </>
  );
};
export default App;
