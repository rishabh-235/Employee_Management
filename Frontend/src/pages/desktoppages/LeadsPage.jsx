import React, { useEffect, useState } from "react";
import "./styles/leadspage.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Papa from "papaparse";
import {
  useAddLeadMutation,
  useGetBulkUploadLeadsQuery,
} from "../../redux/slices/API/lead.apiSlice";

function LeadsPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [cancelVerify, setCancelVerify] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [file, setFile] = useState(null);
  const [addLead] = useAddLeadMutation();
  const { data: leadsData } = useGetBulkUploadLeadsQuery();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    }
  };

  const handleToggleUploadCSV = () => {
    setFile(null);
    setShowUpload(!showUpload);
  };

  const handleVerifyUpload = () => {
    setPercentage(0);
    setCancelVerify(!cancelVerify);
    let count = 1;
    let totalCount = 0;

    Papa.parse(file, {
      worker: true,
      step: function () {
        totalCount++;
      },
      complete: function () {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          step: function (results) {
            const row = results.data;
            if (
              !(
                (row.name &&
                  (row.email || row.phone) &&
                  row.language &&
                  row.location) ||
                row.assignedTo
              )
            ) {
              alert("File Structure is not valid");
            }
            count++;
            setPercentage((count / totalCount) * 100);
          },
          complete: function () {
            document.getElementById("upload-button").disabled = false;
          },
        });
      },
    });
  };

  const handleUploadCSV = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      addLead(formData);
    }
    setShowUpload(false);
    setCancelVerify(false);
  };

  // Helper function to convert date string (YYYY-MM-DD) to Month name
  const getMonthName = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    return `${month}${day}`;
  };

  return (
    <div className="leads-page-container">
      <button className="add-leads-button" onClick={handleToggleUploadCSV}>
        Add Leads
      </button>
      <div className="leads-table-container">
        <div className="leads-table-header">
          <div className="leads-serial-number">No.</div>
          <div className="leads-name">Name</div>
          <div className="leads-date">Date</div>
          <div className="leads-number-of-leads">No. of Leads</div>
          <div className="leads-assigned-leads">Assigned Leads</div>
          <div className="leads-unassigned-leads">Unassigned Leads</div>
        </div>

        <div className="leads-table-body">
          {leadsData?.map((row, index) => (
            <div className="leads-table-row" key={row._id || index}>
              <div className="leads-serial-number">{index + 1}</div>
              <div className="leads-name">{getMonthName(row._id)}</div>
              <div className="leads-date">{row._id}</div>
              <div className="leads-number-of-leads">{row.lead_count}</div>
              <div className="leads-assigned-leads">{row.assigned_leads}</div>
              <div className="leads-unassigned-leads">
                {row.unassigned_leads}
              </div>
              <div className="leads-action-icon">
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M2 8.875C2.55228 8.875 3 8.48325 3 8C3 7.51675 2.55228 7.125 2 7.125C1.44772 7.125 1 7.51675 1 8C1 8.48325 1.44772 8.875 2 8.875Z"
                    stroke="#344054"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 2.75C2.55228 2.75 3 2.35825 3 1.875C3 1.39175 2.55228 1 2 1C1.44772 1 1 1.39175 1 1.875C1 2.35825 1.44772 2.75 2 2.75Z"
                    stroke="#344054"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 15C2.55228 15 3 14.6082 3 14.125C3 13.6418 2.55228 13.25 2 13.25C1.44772 13.25 1 13.6418 1 14.125C1 14.6082 1.44772 15 2 15Z"
                    stroke="#344054"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {showUpload && (
          <div className="upload-leads-container">
            <div className="upload-leads-card">
              <div className="upload-leads-header">
                <div className="upload-leads-title">
                  <h5>CSV Uploads</h5>
                  <p>Add your documents here</p>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: "pointer" }}
                  onClick={handleToggleUploadCSV}
                >
                  <path
                    d="M18.3002 5.70997C17.9102 5.31997 17.2802 5.31997 16.8902 5.70997L12.0002 10.59L7.11022 5.69997C6.72022 5.30997 6.09021 5.30997 5.70021 5.69997C5.31021 6.08997 5.31021 6.71997 5.70021 7.10997L10.5902 12L5.70021 16.89C5.31021 17.28 5.31021 17.91 5.70021 18.3C6.09021 18.69 6.72022 18.69 7.11022 18.3L12.0002 13.41L16.8902 18.3C17.2802 18.69 17.9102 18.69 18.3002 18.3C18.6902 17.91 18.6902 17.28 18.3002 16.89L13.4102 12L18.3002 7.10997C18.6802 6.72997 18.6802 6.08997 18.3002 5.70997Z"
                    fill="#0B0B0B"
                  />
                </svg>
              </div>
              <div className="upload-leads-body">
                <div className="upload-leads-dropzone">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_15_1048)">
                      <path
                        d="M33.4417 3.12073H14.1743V11.1108H37.5567V7.23415C37.5567 4.96579 35.7107 3.12073 33.4417 3.12073Z"
                        fill="#00181B"
                        fillOpacity="0.25"
                      />
                      <path
                        d="M22.5352 12.3403H0V4.92636C0 2.20972 2.21068 0 4.92828 0H12.1336C12.8497 0 13.5396 0.150925 14.1664 0.434509C15.0418 0.828964 15.7939 1.47913 16.3213 2.3286L22.5352 12.3403Z"
                        fill="#00181B"
                      />
                      <path
                        d="M42 14.0001V37.8815C42 40.1527 40.1511 42 37.8789 42H4.12111C1.84891 42 0 40.1527 0 37.8815V9.88062H37.8789C40.1511 9.88062 42 11.7286 42 14.0001Z"
                        fill="#00181B"
                      />
                      <path
                        d="M42 14.0001V37.8815C42 40.1527 40.1511 42 37.8789 42H21V9.88062H37.8789C40.1511 9.88062 42 11.7286 42 14.0001Z"
                        fill="#00181B"
                      />
                      <path
                        d="M32.048 25.9398C32.048 32.0322 27.0919 36.9887 21.0001 36.9887C14.9083 36.9887 9.95215 32.0322 9.95215 25.9398C9.95215 19.8483 14.9083 14.8918 21.0001 14.8918C27.0919 14.8918 32.048 19.8483 32.048 25.9398Z"
                        fill="white"
                      />
                      <path
                        d="M32.0479 25.9398C32.0479 32.0322 27.0918 36.9887 21 36.9887V14.8918C27.0918 14.8918 32.0479 19.8483 32.0479 25.9398Z"
                        fill="#00181B"
                        fillOpacity="0.25"
                      />
                      <path
                        d="M24.5612 26.0753C24.3308 26.2704 24.0485 26.3656 23.7688 26.3656C23.4185 26.3656 23.0705 26.2173 22.827 25.9282L22.2307 25.2213V29.8494C22.2307 30.5287 21.6795 31.0799 21.0002 31.0799C20.3209 31.0799 19.7698 30.5287 19.7698 29.8494V25.2213L19.1734 25.9282C18.7344 26.4476 17.9587 26.514 17.4392 26.0753C16.9201 25.6373 16.8535 24.8612 17.2915 24.3418L19.7271 21.4543C20.0447 21.0788 20.508 20.8628 21.0002 20.8628C21.4924 20.8628 21.9558 21.0788 22.2733 21.4543L24.7089 24.3418C25.147 24.8612 25.0803 25.6373 24.5612 26.0753Z"
                        fill="#00181B"
                      />
                      <path
                        d="M24.561 26.0753C24.3306 26.2704 24.0483 26.3656 23.7686 26.3656C23.4183 26.3656 23.0703 26.2173 22.8268 25.9282L22.2305 25.2213V29.8494C22.2305 30.5287 21.6793 31.0799 21 31.0799V20.8628C21.4922 20.8628 21.9555 21.0788 22.2731 21.4543L24.7087 24.3418C25.1467 24.8612 25.0801 25.6373 24.561 26.0753Z"
                        fill="#00181B"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_15_1048">
                        <rect width="42" height="42" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="upload-leads-drag-text">
                    Drag your file(s) to start uploading
                  </p>
                  <p className="upload-leads-or">OR</p>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept=".csv"
                    id="file-upload-input"
                    style={{ display: "none" }}
                  />
                  <button
                    onClick={() =>
                      document.getElementById("file-upload-input").click()
                    }
                    className="upload-leads-browse-files-button"
                  >
                    Browse files
                  </button>
                </div>
                <div className="upload-leads-downloadzone">
                  <p>{file ? file.name : "No file chosen"}</p>
                  <div></div>
                </div>
              </div>
              <div className="upload-leads-footer">
                <button
                  onClick={handleToggleUploadCSV}
                  className="upload-leads-cancel"
                >
                  Cancel
                </button>
                <button
                  className={`upload-leads-next ${
                    !file ? "upload-disabled" : ""
                  }`}
                  onClick={handleVerifyUpload}
                  disabled={!file}
                >
                  Next{" "}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.0876 5L6.9126 6.175L10.7293 10L6.9126 13.825L8.0876 15L13.0876 10L8.0876 5Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {cancelVerify && (
          <div className="upload-leads-container">
            <div className="upload-leads-card">
              <div className="upload-leads-header">
                <div className="upload-leads-title">
                  <h5>CSV Uploads</h5>
                  <p>Add your documents here</p>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: "pointer" }}
                  onClick={handleVerifyUpload}
                >
                  <path
                    d="M18.3002 5.70997C17.9102 5.31997 17.2802 5.31997 16.8902 5.70997L12.0002 10.59L7.11022 5.69997C6.72022 5.30997 6.09021 5.30997 5.70021 5.69997C5.31021 6.08997 5.31021 6.71997 5.70021 7.10997L10.5902 12L5.70021 16.89C5.31021 17.28 5.31021 17.91 5.70021 18.3C6.09021 18.69 6.72022 18.69 7.11022 18.3L12.0002 13.41L16.8902 18.3C17.2802 18.69 17.9102 18.69 18.3002 18.3C18.6902 17.91 18.6902 17.28 18.3002 16.89L13.4102 12L18.3002 7.10997C18.6802 6.72997 18.6802 6.08997 18.3002 5.70997Z"
                    fill="#0B0B0B"
                  />
                </svg>
              </div>
              <div className="verify-leads-body">
                <div style={{ width: 35, height: 35 }}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={11}
                    styles={{
                      text: {
                        fill: "#000000",
                        fontSize: "22px",
                        fontWeight: "bold",
                      },
                      path: { stroke: "#00181B" },
                    }}
                  />
                </div>
                <p>Verifying</p>
                <button
                  className="verify-cancel-button"
                  onClick={handleVerifyUpload}
                >
                  Cancel
                </button>
              </div>
              <div className="upload-leads-footer">
                <button
                  className="upload-leads-cancel"
                  onClick={handleVerifyUpload}
                >
                  Cancel
                </button>
                <button
                  className="upload-leads-next "
                  id="upload-button"
                  onClick={handleUploadCSV}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadsPage;
