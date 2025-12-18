import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navigation from "./pages/Navigation";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContactCenter from "./pages/ContactCenter";
import Analytics from "./pages/Analytics";
import ChatBot from "./pages/ChatBot";
import Teams from "./pages/Team";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchChatBoxConfig } from "./stateManagement/chatBoxSlice";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchChatBoxConfig());
    }, [dispatch]);
    
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected layout route */}
      <Route path="/navigation" element={<Navigation />}>
        {/* Default child route */}
        <Route index element={<Dashboard />} />

        {/* Nested child routes */}
        <Route path="contactCenter" element={<ContactCenter />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="chatBot" element={<ChatBot />} />
        <Route path="teams" element={<Teams />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
