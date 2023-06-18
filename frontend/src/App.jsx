import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import Profile from "./scenes/Profile";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
