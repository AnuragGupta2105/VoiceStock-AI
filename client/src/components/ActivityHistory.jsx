import { FaHistory } from "react-icons/fa";
import "../styles/activityHistory.css";

function ActivityHistory({ history }) {

  return (

    <div className="activity-card">

      <h3>

        <FaHistory />

        Recent Activity

      </h3>

      {history.length === 0 ? (

        <div className="empty-activity">

          No shopping activity yet.

        </div>

      ) : (

        <div className="activity-scroll">

          <div className="activity-list">

            {history.map((item, index) => (

              <div
                key={index}
                className="activity-item"
              >

                <div className="activity-icon">

                  🛒

                </div>

                <div className="activity-content">

                  <h4>

                    {item.text}

                  </h4>

                  <p>

                    Shopping Activity

                  </p>

                </div>

                <span className="activity-time">

                  {item.time}

                </span>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}

export default ActivityHistory;