import { useEffect, useState } from "react";
import "./style/mobileleadcard.css";
import {
  useGetLeadMutation,
  useChangeTypeMutation,
  useChangeStatusMutation,
  useScheduleLeadMutation,
} from "../redux/slices/API/lead.apiSlice";

function MobileLeadCard({ lead }) {
  const [toggleType, setToggleType] = useState(false);
  const [toggleDate, setToggleDate] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [getLead] = useGetLeadMutation();
  const [leadData, setLeadData] = useState(null);
  const [changeType] = useChangeTypeMutation();
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [changeStatus] = useChangeStatusMutation();
  const [scheduledDate, setScheduledDate] = useState();
  const [scheduledTime, setScheduledTime] = useState();
  const [scheduleLead] = useScheduleLeadMutation();

  useEffect(() => {
    if (lead && lead._id) {
      getLead(lead)
        .unwrap()
        .then((data) => {
          setLeadData(data);
          setType(data.type);
          setStatus(data.status);
          setScheduledDate(data.scheduleAt?.date);
          setScheduledTime(data.scheduleAt?.time);
        })
        .catch((error) => {
          console.error("Error fetching lead:", error);
        });
    }
  }, [lead]);

  const handleChangeType = (event) => {
    let type = "";
    if (event.target.innerText === "Hot") {
      type = "Hot";
    } else if (event.target.innerText === "Warm") {
      type = "Warm";
    } else if (event.target.innerText === "Cold") {
      type = "Cold";
    } else {
      setToggleType(false);
      return;
    }

    setToggleType(!toggleType);
    changeType({ type: type, leadData: leadData })
      .unwrap()
      .then((res) => {
        setType(res.lead.type);
      })
      .catch((error) => {
        console.error("Error changing type to Hot:", error);
      });
  };

  const handleSaveStatus = () => {
    changeStatus({ status: status, leadData: leadData })
      .unwrap()
      .then((res) => {
        setStatus(res.lead.status);
        setToggleStatus(false);
      })
      .catch((error) => {
        console.error("Error changing status:", error);
      });
  };

  const handleScheduleLead = () => {
    const scheduleData = {
      _id: leadData._id,
      scheduledDate,
      scheduledTime,
    };

    scheduleLead(scheduleData)
      .unwrap()
      .then((res) => {
        setLeadData(res.lead);
        setToggleDate(false);
        setScheduledDate("");
        setScheduledTime("");
      })
      .catch((error) => {
        console.error("Error scheduling lead:", error);
      });
  };

  return (
    <div className="mobile-lead-card-container">
      <div className="mobile-lead-card-div1">
        <div className="mobile-lead-card-header">
          <h4>{leadData?.name}</h4>
          <p>{leadData?.email}</p>
        </div>
        <div className="mobile-lead-card-date">
          <p>Date</p>
          <div className="mobile-lead-card-date-value">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.96216 0.577393C9.96216 0.258789 10.2771 0 10.6665 0C11.0559 0 11.3708 0.258789 11.3708 0.577393V3.10669C11.3708 3.42529 11.0559 3.68408 10.6665 3.68408C10.2771 3.68408 9.96216 3.42529 9.96216 3.10669V0.577393ZM8.07007 12.6721C8.02856 12.6721 7.99561 12.4976 7.99561 12.2815C7.99561 12.0654 8.02856 11.8909 8.07007 11.8909H9.99756C10.0391 11.8909 10.072 12.0654 10.072 12.2815C10.072 12.4976 10.0391 12.6721 9.99756 12.6721H8.07007ZM1.93481 8.1897C1.89331 8.1897 1.86035 8.01514 1.86035 7.79907C1.86035 7.58301 1.89331 7.40845 1.93481 7.40845H3.8623C3.90381 7.40845 3.93677 7.58301 3.93677 7.79907C3.93677 8.01514 3.90381 8.1897 3.8623 8.1897H1.93481ZM5.00244 8.1897C4.96094 8.1897 4.92798 8.01514 4.92798 7.79907C4.92798 7.58301 4.96094 7.40845 5.00244 7.40845H6.92993C6.97144 7.40845 7.00439 7.58301 7.00439 7.79907C7.00439 8.01514 6.97144 8.1897 6.92993 8.1897H5.00244ZM8.07007 8.1897C8.02856 8.1897 7.99561 8.01514 7.99561 7.79907C7.99561 7.58301 8.02856 7.40845 8.07007 7.40845H9.99756C10.0391 7.40845 10.072 7.58301 10.072 7.79907C10.072 8.01514 10.0391 8.1897 9.99756 8.1897H8.07007ZM11.1389 8.1897C11.0974 8.1897 11.0645 8.01514 11.0645 7.79907C11.0645 7.58301 11.0974 7.40845 11.1389 7.40845H13.0664C13.1079 7.40845 13.1409 7.58301 13.1409 7.79907C13.1409 8.01514 13.1079 8.1897 13.0664 8.1897H11.1389ZM1.93481 10.4309C1.89331 10.4309 1.86035 10.2563 1.86035 10.0403C1.86035 9.82422 1.89331 9.64966 1.93481 9.64966H3.8623C3.90381 9.64966 3.93677 9.82422 3.93677 10.0403C3.93677 10.2563 3.90381 10.4309 3.8623 10.4309H1.93481ZM5.00244 10.4309C4.96094 10.4309 4.92798 10.2563 4.92798 10.0403C4.92798 9.82422 4.96094 9.64966 5.00244 9.64966H6.92993C6.97144 9.64966 7.00439 9.82422 7.00439 10.0403C7.00439 10.2563 6.97144 10.4309 6.92993 10.4309H5.00244ZM8.07007 10.4309C8.02856 10.4309 7.99561 10.2563 7.99561 10.0403C7.99561 9.82422 8.02856 9.64966 8.07007 9.64966H9.99756C10.0391 9.64966 10.072 9.82422 10.072 10.0403C10.072 10.2563 10.0391 10.4309 9.99756 10.4309H8.07007ZM11.1389 10.4309C11.0974 10.4309 11.0645 10.2563 11.0645 10.0403C11.0645 9.82422 11.0974 9.64966 11.1389 9.64966H13.0664C13.1079 9.64966 13.1409 9.82422 13.1409 10.0403C13.1409 10.2563 13.1079 10.4309 13.0664 10.4309H11.1389ZM1.93481 12.6721C1.89331 12.6721 1.86035 12.4976 1.86035 12.2815C1.86035 12.0654 1.89331 11.8909 1.93481 11.8909H3.8623C3.90381 11.8909 3.93677 12.0654 3.93677 12.2815C3.93677 12.4976 3.90381 12.6721 3.8623 12.6721H1.93481ZM5.00244 12.6721C4.96094 12.6721 4.92798 12.4976 4.92798 12.2815C4.92798 12.0654 4.96094 11.8909 5.00244 11.8909H6.92993C6.97144 11.8909 7.00439 12.0654 7.00439 12.2815C7.00439 12.4976 6.97144 12.6721 6.92993 12.6721H5.00244ZM3.6145 0.577393C3.6145 0.258789 3.92944 0 4.31885 0C4.70825 0 5.02319 0.258789 5.02319 0.577393V3.10669C5.02319 3.42529 4.70825 3.68408 4.31885 3.68408C3.92944 3.68408 3.6145 3.42529 3.6145 3.10669V0.577393ZM0.78125 5.53223H14.2175V2.62085C14.2175 2.52319 14.1772 2.43408 14.1125 2.36816C14.0479 2.30347 13.9587 2.26318 13.8599 2.26318H12.5732C12.3572 2.26318 12.1826 2.08862 12.1826 1.87256C12.1826 1.65649 12.3572 1.48193 12.5732 1.48193H13.8611C14.1748 1.48193 14.4592 1.61011 14.6655 1.81641C14.8718 2.02271 15 2.30713 15 2.62085V5.92407V13.8623C15 14.176 14.8718 14.4605 14.6655 14.6667C14.4592 14.873 14.1748 15.0012 13.8611 15.0012H1.13892C0.825195 15.0012 0.540771 14.873 0.334473 14.6667C0.128174 14.4592 0 14.1748 0 13.8611V5.92285V2.62085C0 2.30713 0.128174 2.02271 0.334473 1.81641C0.540771 1.61011 0.825195 1.48193 1.13892 1.48193H2.51465C2.73071 1.48193 2.90527 1.65649 2.90527 1.87256C2.90527 2.08862 2.73071 2.26318 2.51465 2.26318H1.13892C1.04126 2.26318 0.952148 2.30347 0.88623 2.36816C0.821533 2.43286 0.78125 2.52197 0.78125 2.62085V5.53223ZM14.2188 6.3147H0.78125V13.8611C0.78125 13.9587 0.821533 14.0479 0.88623 14.1138C0.950928 14.1785 1.04004 14.2188 1.13892 14.2188H13.8611C13.9587 14.2188 14.0479 14.1785 14.1138 14.1138C14.1785 14.0491 14.2188 13.96 14.2188 13.8611V6.3147ZM6.15601 2.26318C5.93994 2.26318 5.76538 2.08862 5.76538 1.87256C5.76538 1.65649 5.93994 1.48193 6.15601 1.48193H8.7793C8.99536 1.48193 9.16992 1.65649 9.16992 1.87256C9.16992 2.08862 8.99536 2.26318 8.7793 2.26318H6.15601Z"
                fill="#445668"
              />
            </svg>
            <span>
              {leadData?.recievedAt
                ? new Date(leadData.recievedAt).toISOString().split("T")[0]
                : ""}
            </span>
          </div>
        </div>
      </div>
      <div className="mobile-lead-card-div2">
        <div className="mobile-lead-card-status">
          <svg
            width="85"
            height="85"
            viewBox="0 0 85 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 39.5C0 61.3152 17.6848 79 39.5 79C61.3152 79 79 61.3152 79 39.5C79 17.6848 61.3152 0 39.5 0C17.6848 0 0 17.6848 0 39.5ZM70.1526 39.5C70.1526 56.4289 56.4289 70.1526 39.5 70.1526C22.5711 70.1526 8.84744 56.4289 8.84744 39.5C8.84744 22.5711 22.5711 8.84744 39.5 8.84744C56.4289 8.84744 70.1526 22.5711 70.1526 39.5Z"
              fill={
                type === "Hot"
                  ? "#F77307"
                  : type === "Warm"
                  ? `#F7D307`
                  : `#07EFF7`
              }
            />
          </svg>
          <span className="lead-status">
            {status === "open" ? "Ongoing" : "Closed"}
          </span>
        </div>

        <div className="lead-card-actions">
          <div className="type-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setToggleDate(false);
                setToggleStatus(false);
                setToggleType(!toggleType);
              }}
            >
              <path
                d="M9.99831 0C10.5542 0 11.0981 0.044 11.63 0.132L9.75835 2.004C8.19799 2.05083 6.68544 2.5533 5.40715 3.44948C4.12886 4.34566 3.1407 5.59637 2.56448 7.04743C1.98826 8.49849 1.84917 10.0865 2.16435 11.6156C2.47954 13.1448 3.23522 14.5483 4.33825 15.6531C5.44128 16.758 6.84344 17.5158 8.37189 17.8333C9.90033 18.1507 11.4883 18.0139 12.9399 17.4397C14.3916 16.8655 15.6435 15.879 16.5414 14.6018C17.4393 13.3246 17.9439 11.8125 17.9929 10.252L19.8666 8.38C19.9533 8.90666 19.9966 9.44666 19.9966 10C19.9966 11.9778 19.4102 13.9112 18.3116 15.5557C17.213 17.2002 15.6514 18.4819 13.8245 19.2388C11.9975 19.9957 9.98722 20.1937 8.04774 19.8078C6.10825 19.422 4.32673 18.4696 2.92844 17.0711C1.53015 15.6725 0.577906 13.8907 0.192119 11.9509C-0.193668 10.0111 0.00433213 8.00042 0.76108 6.17316C1.51783 4.3459 2.79934 2.78412 4.44355 1.6853C6.08776 0.58649 8.02083 0 9.99831 0ZM18.8788 1.124C18.5234 0.768479 18.1014 0.486461 17.637 0.294051C17.1727 0.101642 16.6749 0.00260949 16.1723 0.00260949C15.6696 0.00260949 15.1719 0.101642 14.7075 0.294051C14.2431 0.486461 13.8211 0.768479 13.4657 1.124L8.2986 6.292C8.18979 6.40111 8.10766 6.5339 8.05864 6.68L6.09097 12.52C6.02566 12.714 6.01577 12.9224 6.06243 13.1217C6.10908 13.321 6.21042 13.5034 6.35505 13.6483C6.49967 13.7931 6.68184 13.8947 6.88107 13.9417C7.08029 13.9886 7.28866 13.979 7.48273 13.914L13.3217 11.95C13.4685 11.9012 13.602 11.8191 13.7117 11.71L18.8788 6.54C19.2343 6.18453 19.5162 5.76251 19.7086 5.29804C19.901 4.83357 20 4.33575 20 3.833C20 3.33025 19.901 2.83243 19.7086 2.36796C19.5162 1.90349 19.2343 1.47947 18.8788 1.124Z"
                fill="#2051E5"
              />
            </svg>
          </div>

          <div className="time-date-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setToggleType(false);
                setToggleStatus(false);
                setToggleDate(!toggleDate);
              }}
            >
              <path
                d="M11.0026 9.6V6C11.0026 5.71666 10.9066 5.47933 10.7146 5.288C10.5226 5.09667 10.2852 5.00067 10.0026 5C9.71989 4.99933 9.48256 5.09533 9.29056 5.288C9.09856 5.48067 9.00256 5.718 9.00256 6V9.975C9.00256 10.1083 9.02756 10.2377 9.07756 10.363C9.12756 10.4883 9.20256 10.6007 9.30256 10.7L12.6026 14C12.7859 14.1833 13.0192 14.275 13.3026 14.275C13.5859 14.275 13.8192 14.1833 14.0026 14C14.1859 13.8167 14.2776 13.5833 14.2776 13.3C14.2776 13.0167 14.1859 12.7833 14.0026 12.6L11.0026 9.6ZM10.0026 20C8.61923 20 7.31923 19.7373 6.10256 19.212C4.8859 18.6867 3.82756 17.9743 2.92756 17.075C2.02756 16.1757 1.31523 15.1173 0.790564 13.9C0.265898 12.6827 0.00323141 11.3827 0.00256474 10C0.00189808 8.61733 0.264565 7.31733 0.790564 6.1C1.31656 4.88267 2.0289 3.82433 2.92756 2.925C3.82623 2.02567 4.88456 1.31333 6.10256 0.788C7.32056 0.262667 8.62056 0 10.0026 0C11.3846 0 12.6846 0.262667 13.9026 0.788C15.1206 1.31333 16.1789 2.02567 17.0776 2.925C17.9762 3.82433 18.6889 4.88267 19.2156 6.1C19.7422 7.31733 20.0046 8.61733 20.0026 10C20.0006 11.3827 19.7379 12.6827 19.2146 13.9C18.6912 15.1173 17.9789 16.1757 17.0776 17.075C16.1762 17.9743 15.1179 18.687 13.9026 19.213C12.6872 19.739 11.3872 20.0013 10.0026 20ZM10.0026 18C12.2192 18 14.1069 17.221 15.6656 15.663C17.2242 14.105 18.0032 12.2173 18.0026 10C18.0019 7.78266 17.2229 5.895 15.6656 4.337C14.1082 2.779 12.2206 2 10.0026 2C7.78456 2 5.89689 2.77933 4.33956 4.338C2.78223 5.89666 2.00323 7.784 2.00256 10C2.0019 12.216 2.78123 14.1037 4.34056 15.663C5.89989 17.2223 7.78723 18.0013 10.0026 18Z"
                fill="#2051E5"
              />
            </svg>
          </div>

          <div className="lead-status-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setToggleType(false);
                setToggleDate(false);
                setToggleStatus(!toggleStatus);
              }}
            >
              <circle cx="10" cy="10" r="9" stroke="#2051E5" strokeWidth="2" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.33344 13.7217L4 8.34415L5.33312 7L10 11.7055L14.6669 7L16 8.34415L10.6666 13.7217C10.4898 13.8999 10.25 14 10 14C9.75 14 9.51024 13.8999 9.33344 13.7217Z"
                fill="#2051E5"
              />
            </svg>
          </div>
        </div>

        <div
          onClick={handleChangeType}
          className={`mobile-lead-card-dropdown-type ${
            toggleType ? "show-dropdown" : ""
          }`}
        >
          <p>Type</p>
          <button className="hot">Hot</button>
          <button className="warm">Warm</button>
          <button className="cold">Cold</button>
        </div>

        <div
          className={`mobile-lead-card-dropdown-date-time ${
            toggleDate ? "show-dropdown" : ""
          }`}
        >
          <label htmlFor="date">Date</label>
          <input
            onChange={(e) => {
              setScheduledDate(e.target.value);
            }}
            type="text"
            placeholder="dd / mm / yy"
            value={scheduledDate ? scheduledDate : ""}
          />
          <label htmlFor="time">Time</label>
          <input
            onChange={(e) => {
              setScheduledTime(e.target.value);
            }}
            type="text"
            placeholder="00:00 AM/PM"
            value={scheduledTime ? scheduledTime : ""}
          />
          <button
            onClick={handleScheduleLead}
            className="time-date-save-button"
          >
            Save
          </button>
        </div>

        <div
          className={`mobile-lead-card-dropdown-status ${
            toggleStatus ? "show-dropdown" : ""
          }`}
        >
          <p>
            Lead Status
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseOver={() => setShowInfo(true)}
              onMouseOut={() => setShowInfo(false)}
            >
              <path
                d="M9 8.97978C9 8.71456 9.10536 8.46021 9.29289 8.27267C9.48043 8.08514 9.73478 7.97978 10 7.97978C10.2652 7.97978 10.5196 8.08514 10.7071 8.27267C10.8946 8.46021 11 8.71456 11 8.97978V14.9798C11 15.245 10.8946 15.4994 10.7071 15.6869C10.5196 15.8744 10.2652 15.9798 10 15.9798C9.73478 15.9798 9.48043 15.8744 9.29289 15.6869C9.10536 15.4994 9 15.245 9 14.9798V8.97978ZM10 4.05078C9.73478 4.05078 9.48043 4.15614 9.29289 4.34367C9.10536 4.53121 9 4.78556 9 5.05078C9 5.316 9.10536 5.57035 9.29289 5.75789C9.48043 5.94542 9.73478 6.05078 10 6.05078C10.2652 6.05078 10.5196 5.94542 10.7071 5.75789C10.8946 5.57035 11 5.316 11 5.05078C11 4.78556 10.8946 4.53121 10.7071 4.34367C10.5196 4.15614 10.2652 4.05078 10 4.05078Z"
                fill="#929292"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10Z"
                fill="#929292"
              />
            </svg>
          </p>
          <select
            value={status || ""}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="open">Ongoing</option>
            <option disabled={leadData?.scheduleAt?.date ? true : false} value="closed">Closed</option>
          </select>
          <button
            onClick={handleSaveStatus}
            className="lead-status-save-button"
          >
            Save
          </button>
          <div
            className={`lead-status-info ${showInfo ? "show-dropdown" : ""}`}
          >
            <p>Lead can not be closed if scheduled</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileLeadCard;
