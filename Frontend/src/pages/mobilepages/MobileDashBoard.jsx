import "./style/mobiledashboard.css";
import { useSelector } from "react-redux";

function MobileDashBoard() {

  const user = useSelector((state) => state.user.user);

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
              <p>9:15 AM</p>
            </div>
            <div className="break-end-time">
              <p>Ended</p>
              <p>5:30 PM</p>
            </div>
          </div>
          <div className="check-in-checkout-indicator checked-in"></div>
        </div>
        <div className="break-time-table-body">
          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>

          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>

          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>

          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>

          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>

          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>

          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>

          <div className="break-description-row">
            <div className="break-time">
              <div className="break-start-time">
                <p>Break</p>
                <p>9:15 AM</p>
              </div>
              <div className="break-end-time">
                <p>Ended</p>
                <p>5:30 PM</p>
              </div>
            </div>

            <div className="break-date">
              <p>Date</p>
              <p>10/04/2025</p>
            </div>
          </div>
        </div>
      </div>
      <div className="activity-container">
        <h3>
          Recent Activity
        </h3>
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
