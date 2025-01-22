
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetPackage from "./test/GetPackage"; // Adjust the path as needed
import UserRequest from './test/UserRequest';
import Package from "./test/Package"
import AccessRight from './test/AccessRight';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetPackage />} />
        <Route path="/user-requests" element={<UserRequest/>} />
        <Route path="/packages" element={<Package/>} />
        <Route path="/access-rights" element={<AccessRight/>} />
      </Routes>
    </Router>
  );
};

export default App;

