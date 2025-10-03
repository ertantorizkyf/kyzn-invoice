import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRevenue, setPeriod } from "../redux/revenueSlice";
import RevenueChart from "../components/RevenueChart";

const periods = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const TimeSeriesRevenue = () => {
  const dispatch = useDispatch();
  const { data, status, error, period } = useSelector((state) => state.revenue);

  useEffect(() => {
    dispatch(fetchRevenue({ period }));
  }, [dispatch, period]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="kyzn-page-title">Revenue Report</h1>

      {/* Period selection */}
      <div className="kyzn-period-filter">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => dispatch(setPeriod(p.value))}
            className={`kyzn-period-btn ${
              period === p.value 
                ? "kyzn-period-btn--selected" 
                : "kyzn-period-btn--unselected"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {status === "loading" && (
        <div className="kyzn-chart-loading">
          <div className="kyzn-spinner"></div>
          <p>Loading revenue data...</p>
        </div>
      )}
      
      {status === "failed" && (
        <div className="kyzn-chart-error">
          <h3>Error Loading Data</h3>
          <p>{error}</p>
        </div>
      )}

      {status === "succeeded" && (
        <RevenueChart 
          data={data} 
          period={period}
          height={400}
        />
      )}
    </div>
  );
};

export default TimeSeriesRevenue;
