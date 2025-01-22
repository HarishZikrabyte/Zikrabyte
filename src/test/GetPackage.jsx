import { useState } from "react";
import { LuUsers, LuPackageSearch } from "react-icons/lu";
import { SiPrivateinternetaccess } from "react-icons/si";

import "./GetPackeges.css";
import UserRequest from './UserRequest';
import Package from "./Package"
import AccessRight from "./AccessRight";

let GetPackage = () => {
  let [activeButton, setActiveButton] = useState("User Requests");

  let handleNavigation = (button) => {
    setActiveButton(button); 
  };

  let renderContent = () => {
    switch (activeButton) {
      case "User Requests":
        return <div><UserRequest /></div>;
      case "Packages":
        return <div><Package /></div>;
      case "Access Rights":
        return <div><AccessRight /></div>;
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="adminnav">
        <div className="content">
          <h5>Super Admin Dashboard</h5>
          <button className="btn">Logout</button>
        </div>
      </div>
      <div className="btnscontainer">
        <div className="btns">
          <button
            className={activeButton === "User Requests" ? "active" : ""}
            onClick={() => handleNavigation("User Requests")}
          >
            <LuUsers /> User Requests
          </button>
          <button
            className={activeButton === "Packages" ? "active" : ""}
            onClick={() => handleNavigation("Packages")}
          >
            <LuPackageSearch /> Packages
          </button>
          <button
            className={activeButton === "Access Rights" ? "active" : ""}
            onClick={() => handleNavigation("Access Rights")}
          >
            <SiPrivateinternetaccess /> Access Rights
          </button>
        </div>
      </div>
      <div className="content-area">{renderContent()}</div>
    </section>
  );
};

export default GetPackage;
