import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../cssFiles/Analytics/Analytics.css";
import {fetchAnalytics} from '../api/analytics'
import '../App.css'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p>{label}</p>
        <p>{`Chats: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetchAnalytics();
       
        setAnalytics(res);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Analytics</h2>

      {
        loading && 
        <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading analytics ...</p>
         </div>
       }
      {!loading && !analytics && <p className="no-data-msgs">No data available yet</p>}

      {!loading && analytics && (
        <>
          <h3 className="chart-title">Missed chats</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer className="responsiveContainer">
              <LineChart
                data={Object.entries(analytics.missedPerWeek).map(
                  ([week, chats]) => ({
                    week: `Week ${week}`,
                    chats,
                  })
                )}
              >
                <XAxis dataKey="week" stroke="#575252ff" />
                <YAxis stroke="#575252ff" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="chats"
                  stroke="#00ff88"
                  strokeWidth={3}
                  dot={{ stroke: "#00ff88", strokeWidth: 2, r: 5 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Average Reply Time */}
          <div className="metric-card">
            <div className="metric-info">
              <h3>Average Reply Time</h3>
              <p>
                For highest customer satisfaction rates you should aim to reply
                to an incoming customer's message in 15 seconds or less. Quick
                responses will get you more conversations, help you earn
                customers' trust and make more sales.
              </p>
            </div>
            <p className="metric-value">
              {parseInt(analytics.averageReplyTime)} Secs
            </p>
          </div>

          {/* Resolved Tickets */}
          <div className="metric-card">
            <div className="metric-info">
              <h3>Resolved Tickets</h3>
              <p>
                A callback system on a website, as well as proactive
                invitations, help to attract even more customers. A separate
                round button for ordering a call with a small animation helps to
                motivate more customers to make calls.
              </p>
            </div>
            <div className="circular-progress">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${
                    parseFloat(analytics.resolvedPercentage) || 0
                  }, 100`}
                  d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18"
                  y="20"
                  className="percentage"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform="rotate(90, 18, 20)"
                >
                  {analytics.resolvedPercentage
                    ? `${parseFloat(analytics.resolvedPercentage)}%`
                    : "0%"}
                </text>
              </svg>
            </div>
          </div>

          {/* Total Chats */}
          <div className="metric-card">
            <div className="metric-info">
              <h3>Total Chats</h3>
              <p>
                This metric shows the total number of chats for all channels for
                the selected period.
              </p>
            </div>
            <p className="metric-value">{analytics.totalTickets}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;
