/* eslint-disable import/no-named-as-default */
/* eslint-disable import/order */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

import Icon from "@mui/material/Icon";

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import ViewEmployee from "layouts/employee/ViewEmployee";
import EditEmployee from "layouts/employee/editEmployee";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactsIcon from "@mui/icons-material/Contacts";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import BiotechIcon from "@mui/icons-material/Biotech";
import BadgeIcon from "@mui/icons-material/Badge";
import Tables from "./layouts/employee/index";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";

// import SignUp from "layouts/authentication/sign-up";
import AddEmployee from "./layouts/employee/addEmployee";
import Designation from "layouts/Designation/Designation";
import Cv from "layouts/Cv/Cv";
import DocumentType from "layouts/DocumentType/DocumentType";
import Sallaryslip from "layouts/Sallaryslip/Sallaryslip";
import Technology from "layouts/Technology/Technology";
import Maritial from "layouts/Maritial/Maritial";
import Project from "layouts/Project/Project";
import OtherActivities from "layouts/OtherActivities/OtherActivities";
import EmployeeDoc from "layouts/EmpployeeDoc/EmployeeDoc";

import PostAddIcon from "@mui/icons-material/PostAdd";
import CVCreateStapper from "layouts/CVCreate/CVCreateStapper";
import EmpEducation from "layouts/EmpEducation/EmpEducation";
import EmpAddress from "layouts/EmpAddress/EmpAddress";
import EmpWorkExperience from "layouts/EmpWorkExperience/EmpWorkExperience";
import EmpTaskAssign from "layouts/EmpTaskAssign/EmpTaskAssign";
import UpdateEmpTaskAssign from "layouts/EmpTaskAssign/UpdateEmpTaskAssign";
import AddEmpTaskAssign from "layouts/EmpTaskAssign/AddEmpTaskAssign";
import ChangePassWord from "examples/Navbars/DashboardNavbar/ChangePassWord";
import Profile from "examples/Navbars/DashboardNavbar/Profile";
import EmpWorkExpTable from "layouts/EmpWorkExperience/EmpWorkExpTable";
import TableComment from "layouts/Project/TableComment";
import UserDashBoard from "layouts/UserDashboard/UserDashBoard";

// @mui icons

const routes = [
  {
    id: 1,
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    id: 2,
    type: "collapse",
    name: "Employee",
    key: "employee",
    icon: <BadgeIcon />,
    route: "/employee",
    component: <Tables />,
  },
  {
    icon: <Icon fontSize="small">ADD Employee</Icon>,
    route: "/employee/addEmployee",
    component: <AddEmployee />,
  },
  {
    type: "collapse",
    name: "Task Assign",
    key: "Task Assign",
    icon: <ContentPasteGoIcon />,
    route: "/layouts/employeetaskassign",
    component: <EmpTaskAssign />,
  },
  {
    route: "/layouts/addemployeetaskassign",
    component: <AddEmpTaskAssign />,
  },
  {
    route: "/layouts/updateemployeetaskassign",
    component: <UpdateEmpTaskAssign />,
  },
  {
    type: "collapse",
    name: "Sallery Slip",
    key: "sallery-slip",
    icon: <PersonAddAlt1Icon fontSize="medium" />,
    route: "/salleryslip",
    component: <Sallaryslip />,
  },
  {
    type: "collapse",
    name: "Project",
    key: "project",
    icon: <AccountTreeIcon />,
    route: "/project",
    component: <Project />,
  },
  {
    icon: <Icon fontSize="small">View Employee</Icon>,
    route: "/employee/viewEmployee",
    component: <ViewEmployee />,
  },
  {
    icon: <Icon fontSize="small">Edit Employee</Icon>,
    route: "/employee/editEmployee",
    component: <EditEmployee />,
  },
  {
    type: "collapse",
    name: "Employee CV ",
    key: "CV Employee",
    icon: <PostAddIcon fontSize="medium" />,
    route: "/cv",
    component: <Cv />,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Designation",
    key: "Designation",
    icon: <ContactsIcon />,
    route: "/layouts/designation",
    component: <Designation fontSize="medium" />,
  },
  {
    type: "collapse",
    name: "Document Type",
    key: "DocumentType",
    icon: <ContentPasteIcon />,
    route: "/layouts/documenttype",
    component: <DocumentType fontSize="medium" />,
  },
  {
    type: "collapse",
    name: "Technology",
    key: "Technology",
    icon: <BiotechIcon fontSize="medium" />,
    route: "/layouts/Technology",
    component: <Technology fontSize="medium" />,
  },
  {
    type: "collapse",
    name: "Maritial Status",
    key: "Maritial",
    icon: <AutorenewIcon />,
    route: "/layouts/maritial",
    component: <Maritial fontSize="medium" />,
  },
  {
    type: "collapse",
    name: "CV Create",
    key: "CV Create",
    icon: <ContentPasteGoIcon />,
    route: "/layouts/cvcreateemployeelist",
    component: <CVCreateStapper fontSize="medium" />,
  },
  {
    route: "/layouts/othesactivities",
    component: <OtherActivities />,
  },
  {
    route: "/layouts/employeedocument",
    component: <EmployeeDoc />,
  },
  {
    route: "/layouts/employeeeducation",
    component: <EmpEducation />,
  },
  {
    route: "/layouts/employeeaddress",
    component: <EmpAddress />,
  },
  {
    route: "/layouts/employeeworeExperience",
    component: <EmpWorkExperience />,
  },
  {
    route: "/layouts/changepassword",
    component: <ChangePassWord />,
  },
  {
    route: "/layouts/Profile",
    component: <Profile />,
  },
  {
    route: "/layouts/EmployeeWorkExperienceTable",
    component: <EmpWorkExpTable />,
  },
  {
    route: "/layouts/tablecomment",
    component: <TableComment />,
  },
  {
    route: "/userdashboard",
    component: <UserDashBoard fontSize="medium" />,
  },
];

export default routes;
