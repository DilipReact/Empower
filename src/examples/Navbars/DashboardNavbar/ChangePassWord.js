// import React, { useState } from "react";

// import { TextField, Button, Typography, Box } from "@mui/material";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ChangePassWord = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const [showErrors, setshowErrors] = useState(false)

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "oldPassword") setOldPassword(value);
//     if (name === "newPassword") setNewPassword(value);
//     if (name === "confirmPassword") setConfirmPassword(value);
//   };

//   const authToken = localStorage.getItem("authToken");
//   const mydata = JSON.parse(localStorage.getItem("myData"));

//   console.log(authToken);
//   console.log(mydata, "mydata");

//   let empid = mydata.empCode;
//   let emplyee = mydata.employeeName;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess(false);

//     if (newPassword !== confirmPassword) {
//       setError("New password and confirm password do not match.");
//       return;
//     }

//     if (newPassword.length < 8) {
//       setError("New password must be at least 8 characters long.");
//       return;
//     }

//     try {
//       const response = await axios.post("https://localhost:5001/api/UserAccount/UpdatePassword", {
//         empCode: empid,
//         oldPassword,
//         newPassword: newPassword,
//         confirmPassword: confirmPassword,
//         modifiedBy: emplyee,
//       });

//       setSuccess(response.data.message);
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//       navigate("/dashboard");
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, margin: "auto" }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Change Password
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         {error && (
//           <Typography variant="body1" color="error" gutterBottom>
//             {error}
//           </Typography>
//         )}

//         {success && (
//           <Typography variant="body1" color="success" gutterBottom>
//             {success}
//           </Typography>
//         )}

//         <TextField
//           type="text"
//           name="oldPassword"
//           value={oldPassword}
//           onChange={handleChange}
//           label="Old Password"
//           fullWidth
//           margin="normal"
//           required
//         />

//         <TextField
//           type="text"
//           name="newPassword"
//           value={newPassword}
//           onChange={handleChange}
//           label="New Password"
//           fullWidth
//           margin="normal"
//           required
//         />

//         <TextField
//           type="password"
//           name="confirmPassword"
//           value={confirmPassword}
//           onChange={handleChange}
//           label="Confirm New Password"
//           fullWidth
//           margin="normal"
//           required
//         />

//         <Button type="submit" variant="contained" fullWidth>
//           Change Password
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default ChangePassWord;

import React, { useState } from "react";
import { TextField, Button, Typography, Box, InputAdornment, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Function to validate password
const validatePassword = (password) => {
  const numberRegex = /\d/;
  const capitalLetterRegex = /[A-Z]/;
  const specialCharacterRegex = /[!@#$%^&*()]/;

  let errors = [];

  if (!numberRegex.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  if (!capitalLetterRegex.test(password)) {
    errors.push("Password must contain at least one capital letter.");
  }

  if (!specialCharacterRegex.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return errors;
};

const ChangePassWord = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const authToken = localStorage.getItem("authToken");
  const mydata = JSON.parse(localStorage.getItem("myData"));

  console.log(authToken);
  console.log(mydata, "mydata");

  let empid = mydata.empCode;
  let emplyee = mydata.employeeName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate new password
    const passwordValidationErrors = validatePassword(newPassword);
    if (passwordValidationErrors.length > 0) {
      setError(passwordValidationErrors[0]);
      setShowErrors(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setShowErrors(true);
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      setShowErrors(true);
      return;
    }

    try {
      const response = await axios.post("https://localhost:5001/api/UserAccount/UpdatePassword", {
        empCode: empid,
        oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        modifiedBy: emplyee,
      });

      console.log(response,"Responce")
      setSuccess(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/dashboard");

    
    } catch (error) {
      setError(error.response.data.message);
      
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Change Password
      </Typography>

      <form onSubmit={handleSubmit}>
        {showErrors && error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        {success && (
          <Typography variant="body1" color="success" gutterBottom>
            {success}
          </Typography>
        )}

        <TextField
          type="text"
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
          label="Old Password"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          type="text"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          label="New Password"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm New Password"
          fullWidth
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" variant="contained" fullWidth>
          Change Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassWord;
