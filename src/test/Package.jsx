
// import React, { useState } from "react";
// import "./Package.css";
// import { FaEdit } from "react-icons/fa";

// let PackagesTable = () => {
//   let [packages, setPackages] = useState([
//     { id: 1, name: "Basic Package", price: 199.99, description: "Provides basic access." },
//     { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },
//     { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },
//     { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },
//     { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },

//   ]);

//   let [isModalOpen, setIsModalOpen] = useState(false);
//   let [newPackage, setNewPackage] = useState({ name: "", price: "", description: "", access: "" });
//   let [isEditing, setIsEditing] = useState(false);
//   let [editPackageId, setEditPackageId] = useState(null);

//   let handleAddPackageModal = () => {
//     setIsEditing(false);
//     setNewPackage({ name: "", price: "", description: "", access: "" });
//     setIsModalOpen(true);
//   };

//   let handleEditPackage = (pkg) => {
//     setIsEditing(true);
//     setEditPackageId(pkg.id);
//     setNewPackage({ name: pkg.name, price: pkg.price, description: pkg.description, access: pkg.access || "" });
//     setIsModalOpen(true);
//   };

//   let handleSavePackage = () => {
//     if (isEditing) {
//       setPackages(
//         packages.map((pkg) =>
//           pkg.id === editPackageId ? { ...pkg, ...newPackage, price: parseFloat(newPackage.price) } : pkg
//         )
//       );
//     } else {
//       let addedPackage = {
//         id: packages.length + 1,
//         ...newPackage,
//         price: parseFloat(newPackage.price),
//       };
//       setPackages([...packages, addedPackage]);
//     }
//     setIsModalOpen(false);
//     setNewPackage({ name: "", price: "", description: "", access: "" });
//     setEditPackageId(null);
//   };

//   let handleCancelModal = () => {
//     setIsModalOpen(false);
//     setNewPackage({ name: "", price: "", description: "", access: "" });
//     setEditPackageId(null);
//   };

//   let handleInputChange = (e) => {
//     let { name, value } = e.target;
//     setNewPackage({ ...newPackage, [name]: value });
//   };

//   return (
//     <div className="packages-container">
//       <div className="header-container">
//         <h2 className="header-left">Available Packages</h2>
//         <button className="add-package-btn" onClick={handleAddPackageModal}>
//           + Add Package
//         </button>
//       </div>
//       <table className="packages-table">
//         <thead>
//           <tr>
//             <th>Package Name</th>
//             <th>Price</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {packages.map((pkg) => (
//             <tr key={pkg.id}>
//               <td>{pkg.name}</td>
//               <td>${pkg.price.toFixed(2)}</td>
//               <td>{pkg.description}</td>
//               <td>
//                 <FaEdit className="editbtn" onClick={() => handleEditPackage(pkg)} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className="add-modal">
//           <div>
//             <h3>{isEditing ? "Edit Package" : "Add New Package"}</h3>
//             <div>
//               <label>Package Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={newPackage.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter package name"
//               />
//             </div>
//             <div>
//               <label>Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={newPackage.price}
//                 onChange={handleInputChange}
//                 placeholder="Enter price"
//               />
//             </div>
//             <div>
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={newPackage.description}
//                 onChange={handleInputChange}
//                 placeholder="Enter description"
//               />
//             </div>
//             <div>
//               <label>Access Rights</label>
//               <select
//                 name="access"
//                 value={newPackage.access}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Access</option>
//                 <option value="Basic">Basic</option>
//                 <option value="Premium">Premium</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>
//             <div className="button-container">
//               <button onClick={handleCancelModal}>Cancel</button>
//               <button onClick={handleSavePackage}>
//                 {isEditing ? "Save Changes" : "Add Package"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PackagesTable;




import React ,{ useState} from "react";
import "./Package.css";
import { FaEdit } from "react-icons/fa";

let PackagesTable = () => {
  let [packages, setPackages] = useState([
    { id: 1, name: "Basic Package", price: 199.99, description: "Provides basic access." },
    { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },
    { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },
    { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },
    { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },
    { id: 2, name: "Diamond Package", price: 1024.99, description: "Grants access to all modules." },


  ]);

  let [isModalOpen, setIsModalOpen] = useState(false);
  let [newPackage, setNewPackage] = useState({ name: "", price: "", description: "", access: "" });
  let [isEditing, setIsEditing] = useState(false);
  let [editPackageId, setEditPackageId] = useState(null);
  let [errors, setErrors] = useState({});

  let handleAddPackageModal = () => {
    setIsEditing(false);
    setNewPackage({ name: "", price: "", description: "", access: "" });
    setErrors({});
    setIsModalOpen(true);
  };

  let handleEditPackage = (pkg) => {
    setIsEditing(true);
    setEditPackageId(pkg.id);
    setNewPackage({ name: pkg.name, price: pkg.price, description: pkg.description, access: pkg.access || "" });
    setErrors({});
    setIsModalOpen(true);
  };

  let validateInputs = () => {
    let newErrors = {};
    if (!newPackage.name.trim()) newErrors.name = "Package name is Required.";
    if (!newPackage.price || isNaN(newPackage.price) || newPackage.price <= 0) {
      newErrors.price = "Valid price is required.";
    }
    if (!newPackage.description.trim()) newErrors.description = "Description is required.";
    if (!newPackage.access) newErrors.access = "Access rights must be selected.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  let handleSavePackage = () => {
    if (!validateInputs()) return;

    if (isEditing) {
      setPackages(
        packages.map((pkg) =>
          pkg.id === editPackageId ? { ...pkg, ...newPackage, price: parseFloat(newPackage.price) } : pkg
        )
      );
    } else {
      let addedPackage = {
        id: packages.length + 1,
        ...newPackage,
        price: parseFloat(newPackage.price),
      };
      setPackages([...packages, addedPackage]);
    }

    setIsModalOpen(false);
    setNewPackage({ name: "", price: "", description: "", access: "" });
    setEditPackageId(null);
  };

  let handleCancelModal = () => {
    setIsModalOpen(false);
    setNewPackage({ name: "", price: "", description: "", access: "" });
    setEditPackageId(null);
    setErrors({});
  };

  let handleInputChange = (e) => {
    let { name, value } = e.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  return (
    <div className="packages-container">
      <div className="header-container">
        <h2 className="header-left">Available Packages</h2>
        <button className="add-package-btn" onClick={handleAddPackageModal}>
          + Add Package
        </button>
      </div>
      <table className="packages-table">
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.name}</td>
              <td>${pkg.price.toFixed(2)}</td>
              <td>{pkg.description}</td>
              <td>
                <FaEdit className="editbtn" onClick={() => handleEditPackage(pkg)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="add-modal">
          <div>
            <h3>{isEditing ? "Edit Package" : "Add New Package"}</h3>
            <div>
              <label>Package Name</label>
              <input
                type="text"
                name="name"
                value={newPackage.name}
                onChange={handleInputChange}
                placeholder="Enter package name"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={newPackage.price}
                onChange={handleInputChange}
                placeholder="Enter price"
              />
              {errors.price && <p className="error-text">{errors.price}</p>}

            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={newPackage.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
              {errors.description && <p className="error-text">{errors.description}</p>}
            </div>
            <div>
              <label>Access Rights</label>
              <select
                name="access"
                value={newPackage.access}
                onChange={handleInputChange}
              >
                <option value="">Select Access</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.access && <p className="error-text">{errors.access}</p>}
            </div>
            <div className="button-container">
              <button onClick={handleCancelModal}>Cancel</button>
              <button onClick={handleSavePackage}>
                {isEditing ? "Save Changes" : "Add Package"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesTable;
