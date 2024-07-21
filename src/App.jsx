import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import DonorDashboard from "./components/donor_dashboard";
import DonorRegister from "./components/donor_register";
import Home from "./components/home";
import HospitalDashboard from "./components/hospital_dashboard";
import HospitalRegister from "./components/hospital_register";
import Login from "./components/login";
import NavBar from "./components/nav_bar";
import Notification from "./components/Notification";
import Request from "./components/requests";
import {
  requestNotificationPermission,
  showTestNotification,
} from "./config/FirebaseInit";

const App = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      await requestNotificationPermission();
      console.log("Notification permission setup complete");

      // Show a test notification after a short delay
      setTimeout(() => {
        console.log("Triggering test notification");
        showTestNotification();
      }, 5000); // 5 seconds delay
    };

    setupNotifications();
  }, []);

  return (
    <>
      <NavBar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/hospital-register" element={<HospitalRegister />} />
        <Route path="/request-blood" element={<Request />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
      </Routes>
      <ButtonGradient />
    </>
  );
};

export default App;
