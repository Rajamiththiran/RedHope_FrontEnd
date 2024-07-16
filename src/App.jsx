import { Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import DonorRegister from "./components/donor_register";
import NavBar from "./components/nav_bar";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/donor-register" element={<DonorRegister />} />
        {/* Add other routes here */}
      </Routes>

      <ButtonGradient />
    </>
  );
};

export default App;
