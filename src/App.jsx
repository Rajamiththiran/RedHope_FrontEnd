import { Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import DonorRegister from "./components/donor_register";
import Home from "./components/home";
import HospitalRegister from "./components/hospital_register";
import NavBar from "./components/nav_bar";
import Request from "./components/requests"; // Add this import

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/hospital-register" element={<HospitalRegister />} />
        <Route path="/request-blood" element={<Request />} />{" "}
        {/* Add this line */}
        {/* ... other routes */}
      </Routes>
      <ButtonGradient />
    </>
  );
};

export default App;
