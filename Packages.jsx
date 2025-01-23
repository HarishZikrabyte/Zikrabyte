
// ////!!!!!! duplicate code
// import React, { useState, useEffect } from "react";
// import { Trash2, Edit, Plus } from "lucide-react";
// import CustomTooltip from "../../components/CustomTooltip"
// import axiosInstance from "../../api/axiosConfig";
// import Toast from "../../components/Toast";

// const AllPackages = () => {
//     const [validationErrors, setValidationErrors] = useState({});
//     const [successMessage, setSuccessMessage] = useState('');
  
//   const [packages, setPackages] = useState([]);
//   const [accessRights, setAccessRights] = useState([]);
//   const [showAddPackageModal, setShowAddPackageModal] = useState(false);
//   const [editingPackage, setEditingPackage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastConfig, setToastConfig] = useState({
//     type: "success",
//     message: "",
//   });
//   const [packageForm, setPackageForm] = useState({
//     package_name: "",
//     price: "",
//     description: "",
//     access_ids: [],
//   });

// useEffect(() => {
//   fetchPackages();
//   fetchAccessRights();
// }, []); 


//   const fetchAccessRights = async () => {
//     try {
//       const response = await axiosInstance.get(`super-admin/create-access/`);
//       setAccessRights(response.data);
//       // console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching access rights:", error);
//     }
//   };

//   const fetchPackages = async () => {
//     setLoading(true); 
//     try {
//       const response = await axiosInstance.get('super-admin/packages/');
//       setPackages(response.data);
//     } catch (error) {
//       console.error('Error fetching packages:', error);
//     } finally {
//       setLoading(false); 
//     }
//   };
//   const handleSavePackage = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
      
//       if (editingPackage) {
       
//         await axiosInstance.put(`super-admin/packages/${editingPackage.id}`, editingPackage);
//       } else {
        
//         await axiosInstance.post('super-admin/packages/', editingPackage);
//       }
//       setSuccessMessage(editingPackage ? "Package updated successfully!" : "Package added successfully!");
//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000);
   
//       fetchPackages();
//     } catch (error) {
//       console.error('Error saving package:', error);
//       setSuccessMessage('Failed to save package.');
//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleCreatePackage = async (e) => {
//     e.preventDefault();

//     try {
//       const data = {
//         package_name: packageForm.package_name,
//         price: parseFloat(packageForm.price),
//         description: packageForm.description,
//         access_ids: packageForm.access_ids,
//       };

//       const response = await axiosInstance.post(`super-admin/packages/`, data);

//       if (response.data.status) {
//         setToastConfig({
//           type: "success",
//           message: response.data.message || "Package created successfully!",
//         });

//         setShowToast(true);
//         setShowAddPackageModal(false);
//         setEditingPackage(null);
//         fetchPackages();
//       }
//     } catch (error) {
//       console.error("Error creating package:", error);
//       setToastConfig({
//         type: "error",
//         message: "Package name is required.",
//       });
//       setShowToast(true);
      
//     }
//   };

//   const handleUpdatePackageAccess = async (e) => {
//     e.preventDefault();
//     try {
//       const data = {
//         packageId: editingPackage._id,
//         access_ids: packageForm.access_ids,
//       };

//       const response = await axiosInstance.patch(
//         `super-admin/packages/${editingPackage._id}`,
//         data
//       );

//       if (response.data.status) {
//         const successMessage =
//           response.data.message ||
//           "Package access rights updated successfully!";

//         setToastConfig({
//           type: "success",
//           message: successMessage,
//         });

//         setShowToast(true);
//         setShowAddPackageModal(false);
//         setEditingPackage(null);
//         fetchPackages();
//       }
//     } catch (error) {
//       console.error("Error updating package access rights:", error);
//       setToastConfig({
//         type: "error",
//         message:
//           error.response?.data?.message ||
//           "Error updating package access rights",
//       });
//       setShowToast(true);
//     }
//   };

//   const handlePackageSubmit = (e) => {
//     e.preventDefault();
//     const errors = {};
  
//     // Validate all fields
//     Object.keys(packageForm).forEach((key) => {
//       const error = validateField(key, packageForm[key]);
//       if (error) errors[key] = error;
//     });
  
//     if (Object.values(errors).some((error) => error)) {
//       setValidationErrors(errors);
//       return; 
//     }
  
    
//     if (editingPackage) {
//       handleUpdatePackageAccess(e);
//     } else {
//       handleCreatePackage(e);
//     }
//   };
//   const validateField = (name, value) => {
//     let error = "";
  
   
//     switch (name) {
//       case "package_name":
//         if (!value.trim()) error = "Package name is required.";
//         else if (value.length > 50) error = "Package name must not exceed 50 characters.";
//         break;
  
//       case "price":
//         if (!value || isNaN(value) || Number(value) <= 0)
//           error = "Price must be a positive number.";
//         break;
  
//       case "description":
//         if (!value.trim()) error = "Description is required.";
//         else if (value.length > 250) error = "Description must not exceed 250 characters.";
//         break;
  
//       case "access_ids":
//         if (!value || value.length === 0) error = "At least one access right must be selected.";
//         break;
  
//       default:
//         break;
//     }
  
    
//     setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//     return error;
//   };
//   const handleEditClick = async (pkgId) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `super-admin/packages/?package_id=${pkgId}`
//       );
//       const packageData = response.data;

//       console.log(response.data);

//       setPackageForm({
//         package_name: packageData.package_name,
//         price: packageData.price.toString(),
//         description: packageData.description,
//         access_ids: packageData.accesses.map((access) => access._id),
//       });
//       setEditingPackage(packageData);
//       setShowAddPackageModal(true);
//     } catch (error) {
//       console.error("Error fetching package data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const resetPackageForm = () => {
//     setPackageForm({
//       package_name: "",
//       price: "",
//       description: "",
//       access_ids: [],
//     });
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPackageForm((prevState) => ({ ...prevState, [name]: value }));
  
//     // Validate on change
//     validateField(name, value);
//   };

//   const handleAccessChange = (selectedAccessId) => {
//     if (
//       selectedAccessId &&
//       !packageForm.access_ids.includes(selectedAccessId)
//     ) {
//       setPackageForm((prevState) => ({
//         ...prevState,
//         access_ids: [...prevState.access_ids, selectedAccessId],
//       }));
//     }
//   };

//   const removeAccessRight = (accessIdToRemove) => {
//     setPackageForm((prevState) => ({
//       ...prevState,
//       access_ids: prevState.access_ids.filter((id) => id !== accessIdToRemove),
//     }));
//   };
//   const validateForm = () => {
//     if (!packageForm.package_name.trim()) {
//       setToastConfig({
//         type: "error",
//         message: "Package name is required.",
//       });
//       setShowToast(true);
//       return false;
//     }
  
//     if (packageForm.package_name.length > 50) {
//       setToastConfig({
//         type: "error",
//         message: "Package name must not exceed 50 characters.",
//       });
//       setShowToast(true);
//       return false;
//     }
  
//     if (!packageForm.price || isNaN(packageForm.price) || Number(packageForm.price) <= 0) {
//       setToastConfig({
//         type: "error",
//         message: "Price must be a positive number.",
//       });
//       setShowToast(true);
//       return false;
//     }
  
//     if (!packageForm.description.trim()) {
//       setToastConfig({
//         type: "error",
//         message: "Description is required.",
//       });
//       setShowToast(true);
//       return false;
//     }
  
//     if (packageForm.description.length > 250) {
//       setToastConfig({
//         type: "error",
//         message: "Description must not exceed 250 characters.",
//       });
//       setShowToast(true);
//       return false;
//     }
  
//     if (!packageForm.access_ids.length) {
//       setToastConfig({
//         type: "error",
//         message: "At least one access right must be selected.",
//       });
//       setShowToast(true);
//       return false;
//     }
  
//     return true;
//   };
//   const PackageModal = () => {
//     const handleCloseModal = (e) => {
//       // If the click is outside of the modal content, close the modal
//       if (e.target === e.currentTarget) {
//         setShowAddPackageModal(false);
//         setEditingPackage(null);
//         resetPackageForm();
//       }
//     };
  
//     return (
//       <div  
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//         onClick={handleCloseModal}  
//       >
//         <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[100vh] min-h-[70vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
//         {successMessage && (
//       <div className="mb-4 text-green-500 font-medium text-center">{successMessage}</div>
//     )}


//           {/* Close Button (X) */}
//           <button
//             type="button"
//             onClick={() => {
//               setShowAddPackageModal(false);
//               setEditingPackage(null);
//               resetPackageForm();
//             }}
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             <span className="text-2xl font-bold">&times;</span>
//           </button>
  
//           <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
//             {editingPackage ? "Edit Package" : "Add New Package"}
//           </h3>
//           <form onSubmit={handlePackageSubmit} className="space-y-4">
//             {/* Package Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Package Name</label>
//               <input
//                 type="text"
//                 name="package_name"
//                 value={packageForm.package_name}
//                 onChange={(e) => {
//                   handleInputChange(e);
//                   validateField(e.target.name, e.target.value);
//                 }}
//                 onBlur={() => validateField("package_name", packageForm.package_name)}
//                 className={`mt-1 h-10 block w-full rounded-md ${validationErrors.package_name ? "border-gray-300" : "border-red-500"} shadow-sm focus:ring-green-500`}
//                 required
//               />
//               {validationErrors.package_name && (
//                 <p className="text-red-500 text-sm mt-1">{validationErrors.package_name}</p>
//               )}
//             </div>
  
//             {/* Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={packageForm.price}
//                 onChange={(e) => {
//                   handleInputChange(e);
//                   validateField(e.target.name, e.target.value);
//                 }}
//                 onBlur={() => validateField("price", packageForm.price)}
//                 className={`mt-1 block w-full rounded-md ${validationErrors.price ? "border-gray-300" : "border-red-500"} shadow-sm focus:ring-green-500`}
//                 required
//                 step="0.01"
//               />
//               {(!packageForm.price || packageForm.price <= 0) && (
//                 <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>
//               )}
//             </div>
  
//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 name="description"
//                 value={packageForm.description}
//                 onChange={(e) => {
//                   handleInputChange(e);
//                   validateField(e.target.name, e.target.value);
//                 }}
//                 onBlur={() => validateField("description", packageForm.description)}
//                 className={`mt-1 block w-full rounded-md ${validationErrors.description ? "border-gray-300" : "border-red-500"} shadow-sm focus:ring-green-500`}
//                 required
//               />
//               {!packageForm.description.trim() && (
//                 <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
//               )}
//             </div>
  
//             {/* Access Rights */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Access Rights</label>
//               <select
//                 value=""
//                 onChange={(e) => {
//                   const selectedAccessId = e.target.value;
//                   if (selectedAccessId) {
//                     handleAccessChange(selectedAccessId);
//                     validateField("access_ids", [...packageForm.access_ids, selectedAccessId]);
//                   }
//                 }}
//                 onBlur={() => validateField("access_ids", packageForm.access_ids)}
//                 className={`mt-1 block w-full rounded-md ${validationErrors.access_ids ? "border-gray-300" : "border-red-500"} shadow-sm focus:ring-green-500`}
//               >
//                 <option value="">Select Access</option>
//                 {accessRights.map((access) => (
//                   <option
//                     key={access._id}
//                     value={access._id}
//                     disabled={packageForm.access_ids.includes(access._id)}
//                   >
//                     {access.access}
//                   </option>
//                 ))}
//               </select>
//               {validationErrors.access_ids && (
//                 <p className="text-red-500 text-sm mt-1">{validationErrors.access_ids}</p>
//               )}
//             </div>
  
//             {/* Selected Access Rights */}
//             <div className="flex flex-wrap gap-2 mt-2">
//               {packageForm.access_ids.map((accessId) => {
//                 const access = accessRights.find((a) => a._id === accessId);
//                 return (
//                   <div
//                     key={accessId}
//                     className="px-3 py-1 bg-gray-200 rounded-md flex items-center space-x-2"
//                   >
//                     <span className="text-sm text-gray-700">
//                       {access ? access.access : "Unknown Access"}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => removeAccessRight(accessId)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       &times;
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
  
//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowAddPackageModal(false);
//                   setEditingPackage(null);
//                   resetPackageForm();
//                 }}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
         
//               <button onClick={handleSavePackage}
//                 type="submit"
//                 className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-green-300"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : editingPackage ? "Update Package" : "Add Package"}
             
//               </button>
      
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div>      
//       {/* Header and Add Button */}
//       <div className="flex justify-between items-center mb-6 bg-red-400">
//         <h3 className="text-lg font-medium text-gray-900">
//           Available Packages
//         </h3>
//         <button
//           onClick={() => {
//             setEditingPackage(null);
//             setPackageForm({
//               package_name: "",
//               price: "",
//               description: "",
//               access_ids: [],
//             });
//             setShowAddPackageModal(true);
//           }}
//           className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Add Package
//         </button>
//       </div>

//       {/* Packages Table */}
//       <div className="bg-white rounded-lg shadow">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Package Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Description
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {Array.isArray(packages) &&
//               packages.map((pkg) => (
//                 <tr key={pkg?._id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {pkg?.package_name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       ${pkg?.price.toFixed(2)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-500">
//                       {pkg?.description}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4  whitespace-nowrap text-sm font-medium">
//                     <CustomTooltip text="Edit" position="top">
//                       <button
//                         onClick={() => handleEditClick(pkg._id)}
//                         className="text-indigo-600 hover:text-indigo-900 mr-4"
//                       >
//                         <Edit className="h-5 w-5 inline" />
//                       </button>
//                     </CustomTooltip>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//         <div className="p-4">
//       {loading ? (
//         <div className="flex justify-center items-center space-x-2">
//           <div className="w-16 h-16 border-8 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div> 
//           <span className="text-lg text-gray-700">Loading...</span>
//         </div>
//       ) : (
//         <div>
//           {/* Render the packages once they are fetched */}
//           <ul>
//             {packages.map((pkg) => (
//               <li key={pkg.id} className="py-2">{pkg.name}</li> // Replace with your package data
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//       </div>

//       {/* Conditional Modal Rendering */}
//       {showAddPackageModal && <PackageModal />}
//       {showToast && (
//         <Toast
//           type={toastConfig.type}
//           message={toastConfig.message}
//           onClose={() => setShowToast(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AllPackages;







import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import CustomTooltip from "../../components/CustomTooltip";
import axiosInstance from "../../api/axiosConfig";
import Toast from "../../components/Toast";

const AllPackages = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [packages, setPackages] = useState([]);
    const [accessRights, setAccessRights] = useState([]);
    const [showAddPackageModal, setShowAddPackageModal] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        type: "success",
        message: "",
    });
    const [packageForm, setPackageForm] = useState({
        package_name: "",
        price: "",
        description: "",
        access_ids: [],
    });

    useEffect(() => {
        fetchPackages();
        fetchAccessRights();
    }, []);

    const fetchAccessRights = async () => {
        try {
            const response = await axiosInstance.get(`super-admin/create-access/`);
            setAccessRights(response.data);
        } catch (error) {
            console.error("Error fetching access rights:", error);
        }
    };

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('super-admin/packages/');
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = async (pkgId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`super-admin/packages/?package_id=${pkgId}`);
            const packageData = response.data;

            setPackageForm({
                package_name: packageData.package_name,
                price: packageData.price.toString(),
                description: packageData.description,
                access_ids: packageData.accesses.map((access) => access._id),
            });
            setEditingPackage(packageData);
            setShowAddPackageModal(true);
        } catch (error) {
            console.error("Error fetching package data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePackageSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        // Validate all fields
        Object.keys(packageForm).forEach((key) => {
            const error = validateField(key, packageForm[key]);
            if (error) errors[key] = error;
        });

        if (Object.values(errors).some((error) => error)) {
            setValidationErrors(errors);
            return;
        }

        try {
            setLoading(true);
            console.log('Form data:', packageForm);
            const data = {
                package_name: packageForm.package_name,
                price: parseFloat(packageForm.price),
                description: packageForm.description,
                access_ids: packageForm.access_ids,
            };

            if (editingPackage) {
                await axiosInstance.patch(`super-admin/packages/${editingPackage._id}`, data);
                setSuccessMessage("Package updated successfully!");
            } else {
                await axiosInstance.post('super-admin/packages/', data);
                setSuccessMessage("Package added successfully!");
            }

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            fetchPackages();
            setShowAddPackageModal(false);
            setEditingPackage(null);
            resetPackageForm();
        } catch (error) {
            console.error('Error saving package:', error);
            setSuccessMessage('Failed to save package.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "package_name":
                if (!value.trim()) error = "Package name is required.";
                else if (value.length > 50) error = "Package name must not exceed 50 characters.";
                break;
            case "price":
                if (!value || isNaN(value) || Number(value) <= 0) error = "Price must be a positive number.";
                break;
            case "description":
                if (!value.trim()) error = "Description is required.";
                else if (value.length > 250) error = "Description must not exceed 250 characters.";
                break;
            case "access_ids":
                if (!value || value.length === 0) error = "At least one access right must be selected.";
                break;
            default:
                break;
        }
        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        return error;
    };

    const resetPackageForm = () => {
        setPackageForm({
            package_name: "",
            price: "",
            description: "",
            access_ids: [],
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPackageForm((prevState) => ({ ...prevState, [name]: value }));
        validateField(name, value);
    };

    const handleAccessChange = (selectedAccessId) => {
        if (selectedAccessId && !packageForm.access_ids.includes(selectedAccessId)) {
            setPackageForm((prevState) => ({
                ...prevState,
                access_ids: [...prevState.access_ids, selectedAccessId],
            }));
        }
    };

    const removeAccessRight = (accessIdToRemove) => {
        setPackageForm((prevState) => ({
            ...prevState,
            access_ids: prevState.access_ids.filter((id) => id !== accessIdToRemove),
        }));
    };

    const PackageModal = () => {
        const handleCloseModal = (e) => {
            if (e.target === e.currentTarget) {
                setShowAddPackageModal(false);
                setEditingPackage(null);
                resetPackageForm();
            }
        };

        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                onClick={handleCloseModal}
            >
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[100vh] min-h-[70vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                    {successMessage && (
                        <div className="mb-4 text-green-500 font-medium text-center">{successMessage}</div>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            setShowAddPackageModal(false);
                            setEditingPackage(null);
                            resetPackageForm();
                        }}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <span className="text-2xl font-bold">&times;</span>
                    </button>

                    <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                        {editingPackage ? "Edit Package" : "Add New Package"}
                    </h3>
                    <form onSubmit={handlePackageSubmit} className="space-y-4">
                        {/* Package Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Package Name</label>
                            <input
                                type="text"
                                name="package_name"
                                value={packageForm.package_name}
                                onChange={handleInputChange}
                                className={`mt-1 h-10 block w-full rounded-md ${validationErrors.package_name ? "border-red-500" : "border-gray-300"} shadow-sm focus:ring-green-500`}
                                required
                            />
                            {validationErrors.package_name && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.package_name}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={packageForm.price}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md ${validationErrors.price ? "border-red-500" : "border-gray-300"} shadow-sm focus:ring-green-500`}
                                required
                                step="0.01"
                            />
                            {validationErrors.price && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={packageForm.description}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md ${validationErrors.description ? "border-red-500" : "border-gray-300"} shadow-sm focus:ring-green-500`}
                                required
                            />
                            {validationErrors.description && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                            )}
                        </div>

                        {/* Access Rights */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Access Rights</label>
                            <select
                                value=""
                                onChange={(e) => {
                                    const selectedAccessId = e.target.value;
                                    if (selectedAccessId) {
                                        handleAccessChange(selectedAccessId);
                                    }
                                }}
                                className={`mt-1 block w-full rounded-md ${validationErrors.access_ids ? "border-red-500" : "border-gray-300"} shadow-sm focus:ring-green-500`}
                            >
                                <option value="">Select Access</option>
                                {accessRights.map((access) => (
                                    <option
                                        key={access._id}
                                        value={access._id}
                                        disabled={packageForm.access_ids.includes(access._id)}
                                    >
                                        {access.access}
                                    </option>
                                ))}
                            </select>
                            {validationErrors.access_ids && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.access_ids}</p>
                            )}
                        </div>

                        {/* Selected Access Rights */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {packageForm.access_ids.map((accessId) => {
                                const access = accessRights.find((a) => a._id === accessId);
                                return (
                                    <div
                                        key={accessId}
                                        className="px-3 py-1 bg-gray-200 rounded-md flex items-center space-x-2"
                                    >
                                        <span className="text-sm text-gray-700">
                                            {access ? access.access : "Unknown Access"}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeAccessRight(accessId)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddPackageModal(false);
                                    setEditingPackage(null);
                                    resetPackageForm();
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-green-300"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : editingPackage ? "Update Package" : "Add Package"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Header and Add Button */}
            <div className="flex justify-between items-center mb-6 bg-red-400">
                <h3 className="text-lg font-medium text-gray-900">Available Packages</h3>
                <button
                    onClick={() => {
                        setEditingPackage(null);
                        resetPackageForm();
                        setShowAddPackageModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Package
                </button>
            </div>

            {/* Packages Table */}
            <div className="bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.isArray(packages) && packages.map((pkg) => (
                            <tr key={pkg?._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{pkg?.package_name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">${pkg?.price.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500">{pkg?.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <CustomTooltip text="Edit" position="top">
                                        <button
                                            onClick={() => handleEditClick(pkg._id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            <Edit className="h-5 w-5 inline" />
                                        </button>
                                    </CustomTooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4">
                    {loading ? (
                        <div className="flex justify-center items-center space-x-2">
                            <div className="w-16 h-16 border-8 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
                            <span className="text-lg text-gray-700">Loading...</span>
                        </div>
                    ) : (
                        <div>
                            {/* Render the packages once they are fetched */}
                            <ul>
                                {packages.map((pkg) => (
                                    <li key={pkg.id} className="py-2">{pkg.name}</li> // Replace with your package data
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Conditional Modal Rendering */}
            {showAddPackageModal && <PackageModal />}
            {showToast && (
                <Toast
                    type={toastConfig.type}
                    message={toastConfig.message}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default AllPackages;