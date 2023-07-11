import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import React, { useState, useEffect } from "react";

import { Grid } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

function TableComment() {
  const navigate = useNavigate();

  const location = useLocation();

  const myData = location.state.data;

  console.log(myData, "dfdsfkdhfbkhdfhkdfhk");

  const [allCommentData, setAllCommentData] = useState([]);

  useEffect(() => {
    axios

      .get("http://localhost:5000/api/Comment/GetComment")

      .then((repsonse) => setAllCommentData(repsonse.data))

      .catch((error) => console.log(error));
  }, []);

  const commentTableData = allCommentData?.filter(
    (item) => item.commentTaskId === myData.projectEmpCode
  );

  console.log(commentTableData);

  return (
    <DashboardLayout>
      <Grid className="comment_btn">
        <button className="btn" onClick={() => navigate("/project")}>
          Back
        </button>
      </Grid>

      <table className="comment_table">
        <tr>
          <th>Employee ID</th>
          <th>Duration</th>
          <th>Comment</th>
        </tr>

        {commentTableData.map((item) => (
          <tr>
            <td>{item.commentTaskId}</td>
            <td>{item.createdOn}</td>
            <td>{item.commentText}</td>
          </tr>
        ))}
      </table>
    </DashboardLayout>
  );
}

export default TableComment;
