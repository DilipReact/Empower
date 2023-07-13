/* eslint-disable import/order */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Logo from "../../../assets/images/Mp_Logo.png"

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { log } from "pdfmake/build/pdfmake";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [accountEmpCode, setaccountEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  console.log(error);
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (password === "" || accountEmpCode === "") {
      setError("All fields are mandatory");
    } else {
      axios
        .post("https://localhost:5001/api/UserAccount/AccountLogin", {
          accountEmpCode: accountEmpCode,
          password: password,
        })
        .then((response) => {
          if (response.data.status === 3) {
            setError("Employee ID or Password Is incorrect");
          } else {
            localStorage.setItem("myTocken", "success");
            localStorage.setItem("myData", JSON.stringify(response.data));
            window.location.reload();
          }
        })
        .catch((err) => {
          seterrorMessage("Invalid Password Please Correct it");
          setError(err.message);
        });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
         <img src={Logo} height={100} width={150}/>
        </MDBox>
        <span style={{ color: "red", fontSize: "12px", margin: "auto" }}>{error}</span>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                label="Email"
                fullWidth
                onChange={(e) => setaccountEmpCode(e.target.value)}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  ml: -1,
                }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={handleButtonClick}
                type="submit"
                variant="gradient"
                color="info"
                fullWidth
              >
                Sign In
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
