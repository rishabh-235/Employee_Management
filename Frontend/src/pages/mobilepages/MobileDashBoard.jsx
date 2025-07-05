import { useGetActivityEmployeeMutation } from "../../redux/slices/API/activity.apiSlice";
import "./style/mobiledashboard.css";
import { useSelector } from "react-redux";

function MobileDashBoard() {
  const user = useSelector((state) => state.user.user);
  const { data: activityEmployeeData } = useGetActivityEmployeeMutation(user.employeeId);

  const formateDate = (unformated) => {
    const date = new Date(unformated);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const timeFormatted = date.toLocaleTimeString("en-US", options);

    return timeFormatted;
  };

  const getTimeAgo = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;
    const diffHrs = diffMs / (1000 * 60 * 60);
    if (diffHrs < 1) return "recently";
    const rounded = Math.floor(diffHrs);
    const mins = (diffHrs - rounded) * 60;
    if (mins >= 30) return `${rounded + 1} hour ago`;
    return `${rounded} hour ago`;
  };

  const getActivityMessage = (activity) => {
    let timeAgo = getTimeAgo(activity.createdAt);
    if (activity.activityType === "lead closed") {
      return `You closed a lead - ${timeAgo}`;
    } else if (activity.activityType === "lead assigned") {
      return `You were assigned a lead - ${timeAgo}`;
    }
    return "";
  };

  return (
    <div className="mobile-dashboard-container">
      <h3>Timings</h3>
      <div className="check-in-checkout-time-container">
        <div className="check-in-checkout-time">
          <div className="check-in-time">
            <p>Checked-in</p>
            <p>{user.checkIn}</p>
          </div>
          <div className="check-out-time">
            <p>Checked-out</p>
            <p>--:--</p>
          </div>
        </div>
        <div className="check-in-checkout-indicator checked-in"></div>
      </div>
      <div className="break-time-table-container">
        <div className="break-time-table-header">
          <div className="break-time">
            <div className="break-start-time">
              <p>Break</p>
              <p>{user.currentBreak.start.time}</p>
            </div>
            <div className="break-end-time">
              <p>Ended</p>
              <p>{user.currentBreak.end}</p>
            </div>
          </div>
          <div className="check-in-checkout-indicator checked-out"></div>
        </div>
        <div className="break-time-table-body">
          {user?.break?.map((breakItem, index) => (
            <div key={index} className="break-description-row">
              <div className="break-time">
                <div className="break-start-time">
                  <p>Break</p>
                  <p>{formateDate(breakItem.start)}</p>
                </div>
                <div className="break-end-time">
                  <p>Ended</p>
                  <p>{formateDate(breakItem.end)}</p>
                </div>
              </div>

              <div className="break-date">
                <p>Date</p>
                <p>{breakItem.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="activity-container">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <ul>
            {activityEmployeeData?.map((activity, index) => (
              <li key={index}>{getActivityMessage(activity)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileDashBoard;
