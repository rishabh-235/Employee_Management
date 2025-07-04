import "./style/mobiledashboard.css";
import { useSelector } from "react-redux";

function MobileDashBoard() {
  const user = useSelector((state) => state.user.user);

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
                  <p>
                    {formateDate(breakItem.start)}
                  </p>
                </div>
                <div className="break-end-time">
                  <p>Ended</p>
                  <p>
                    {formateDate(breakItem.end)}
                  </p>
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
            <li>You were assigned 3 more new leads - 1 hour ago</li>
            <li>You closed a deal todya - 2 hour ago</li>
            <li>You were assigned 3 more new leads - 1 hour ago</li>
            <li>You closed a deal todya - 2 hour ago</li>
            <li>You were assigned 3 more new leads - 1 hour ago</li>
            <li>You closed a deal todya - 2 hour ago</li>
            <li>You were assigned 3 more new leads - 1 hour ago</li>
            <li>You closed a deal todya - 2 hour ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileDashBoard;
