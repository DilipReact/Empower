import React, { useState } from "react";
import { TextField, Button, Typography, Box, InputAdornment, IconButton } from "@mui/material";
import axios from "axios";

import "./ChangePass.css";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const validatePassword = (password) => {
  const numberRegex = /\d/;
  const capitalLetterRegex = /[A-Z]/;
  const specialCharacterRegex = /[!@#$%^&*()]/;
  let trimmedPassword = password.trim();
  let errors = [];
  if (password !== trimmedPassword) {
    errors.push(<p className="textsize"> Extra spaces are not allowed in the password.</p>);
  }
  if (!numberRegex.test(trimmedPassword)) {
    errors.push(<p className="textsize">Password must contain at least one number. </p>);
  }
  if (!capitalLetterRegex.test(trimmedPassword)) {
    errors.push(<p className="textsize">Password must contain at least one capital letter.</p>);
  }
  if (!specialCharacterRegex.test(trimmedPassword)) {
    errors.push(<p className="textsize">Password must contain at least one special character.</p>);
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
    const passwordValidationErrors = validatePassword(newPassword);
    if (passwordValidationErrors.length > 0) {
      setError(passwordValidationErrors[0]);
      setShowErrors(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(<p className="textsize">New password and confirm password do not match.</p>);
      setShowErrors(true);
      return;
    }
    if (newPassword.length < 8) {
      setError(<p className="textsize">New password must be at least 8 characters long. </p>);
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
      console.log(response.data);

      console.log(success);

      setSuccess(response.data);
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
            {}
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
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
