// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Ensure Axios is installed
// import "./Dropdown.css";

// let AccessDropdown = () => {
//   let [accessOptions, setAccessOptions] = useState([]); // Dropdown options
//   let [selectedAccess, setSelectedAccess] = useState(""); // Selected option
//   let [error, setError] = useState("");
//   let [isLoading, setIsLoading] = useState(false);
//   const token =
//     "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1MDQxOTdlZDRlNjZjYmE0NDIwNjYzIiwicm9sZSI6InN1cGVyX2FkbWluIiwibmFtZSI6InN3YXJuYSB2IiwiZXhwIjoxNzM3NTQyNzkyLCJkZXZpY2VfaWQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTMxLjAuMC4wIFNhZmFyaS81MzcuMzYvNjc1MDQxOTdlZDRlNjZjYmE0NDIwNjYzLzIwMjUtMDEtMjFUMTA6NDY6MzIuNTI5MjMwIiwicmVmcmVzaF90b2tlbl92ZXJzaW9uIjoxfQ.sxGLyza79w3iWeF-qgt_zaa9g5sXZ0QO8ZEuxONVxxpjLxsFDAyi-HfmVbGANo3bEKmy8rGehi1cHAyA_mRyVA";

//   // Fetch access options from API
//   useEffect(() => {
//     let fetchAccessOptions = async () => {
//       try {
//         setIsLoading(true); // Start loading
//         let response = await axios.get(
//           "https://9jdcxxr1-8001.inc1.devtunnels.ms/super-admin/create-access/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Use Bearer token format
//             },
//           }
//         );
//         console.log("Fetched Data:", response.data); // Log the response data to check its structure
//         setAccessOptions(response.data); // Populate dropdown options
//         setError(""); // Clear errors
//       } catch (err) {
//         console.error("Error fetching access options:", err);
//         setError("Failed to fetch access options. Please try again.");
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     };

//     fetchAccessOptions();
//   }, []); // Empty dependency array, so it only runs once after the component mounts

//   // Handle dropdown selection changes
//   let handleAccessChange = (e) => {
//     setSelectedAccess(e.target.value);
//   };

//   return (
//     <div className="dropdown-container">
//       <h2>Select Access</h2>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <select
//           value={selectedAccess}
//           onChange={handleAccessChange}
//           className="access-dropdown"
//         >
//           <option value="">-- Select Access --</option>
//           {accessOptions && accessOptions.length > 0 ? (
//             accessOptions.map((option) => (
//               <option key={option._id} value={option._id}>
//                 {option.name} {/* Show the access name */}
//               </option>
//             ))
//           ) : (
//             <option value="" disabled>No data available</option>
//           )}
//         </select>
//       )}

//       {/* Display the selected access */}
//       {selectedAccess && (
//         <div className="selected-access">
//           <h3>Selected Access:</h3>
//           <p>
//             {/* Find the selected option and display its name */}
//             {accessOptions.find((opt) => opt._id === selectedAccess)?.name}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccessDropdown;





//!! ONLY ID 
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure Axios is installed
import "./Dropdown.css";

let AccessDropdown = () => {
  let [accessOptions, setAccessOptions] = useState([]); // Dropdown options
  let [selectedAccess, setSelectedAccess] = useState(""); 
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1MDQxOTdlZDRlNjZjYmE0NDIwNjYzIiwicm9sZSI6InN1cGVyX2FkbWluIiwibmFtZSI6InN3YXJuYSB2IiwiZXhwIjoxNzM3NTQyNzkyLCJkZXZpY2VfaWQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTMxLjAuMC4wIFNhZmFyaS81MzcuMzYvNjc1MDQxOTdlZDRlNjZjYmE0NDIwNjYzLzIwMjUtMDEtMjFUMTA6NDY6MzIuNTI5MjMwIiwicmVmcmVzaF90b2tlbl92ZXJzaW9uIjoxfQ.sxGLyza79w3iWeF-qgt_zaa9g5sXZ0QO8ZEuxONVxxpjLxsFDAyi-HfmVbGANo3bEKmy8rGehi1cHAyA_mRyVA";

  // !!Fetch access options from API
  useEffect(() => {
    let fetchAccessOptions = async () => {
      try {
        setIsLoading(true); 
        let response = await axios.get(
          "https://9jdcxxr1-8001.inc1.devtunnels.ms/super-admin/create-access/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched Data:", response.data); 
        if (Array.isArray(response.data)) {
          setAccessOptions(response.data); 
        } else {
          setError("Invalid data format received.");
        }
        setError(""); 
      } catch (err) {
        console.error("Error fetching access options:", err);
        setError("Failed to fetch access options. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessOptions();
  }, []);

  let handleAccessChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedAccess(selectedId); 

    if (selectedId) {
      try {
        const response = await axios.post(
          "https://9jdcxxr1-8001.inc1.devtunnels.ms/super-admin/send-access", 
          { accessId: selectedId }, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        console.log("Access ID Sent Successfully:", response.data);
        setError("");
        alert("Access sent successfully!");
      } catch (error) {
        console.error("Error sending access:", error);
        setError("Failed to send the access. Please try again.");
      }
    }
  };

  return (
    <div className="dropdown-container">
      <h2>Select Access</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <select
            value={selectedAccess}
            onChange={handleAccessChange}
            className="access-dropdown"
          >
            <option value="">-- Select Access --</option>
            {accessOptions.length > 0 ? (
              accessOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.access}
                </option>
              ))
            ) : (
              <option value="" disabled>No options available</option>
            )}
          </select>
        </div>
      )}

      {/* Display the selected access */}
      {selectedAccess && (
        <div className="selected-access">
          <h3>Selected Access:</h3>
          <p>
            {accessOptions.find((opt) => opt._id === selectedAccess)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessDropdown;
