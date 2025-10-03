import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import formatNumber from "../utils/formatNumber";

const RevenueChart = ({ 
  data = [], 
  height = 400,
  period = "daily"
}) => {
  // Safe data formatting with error handling
  const formatData = (rawData) => {
    try {
      if (!Array.isArray(rawData)) return [];
      
      return rawData.map(item => {
        try {
          return {
            ...item,
            date: formatDate(item.period, period),
            revenue: parseFloat(item.total_revenue) || 0
          };
        } catch (error) {
          console.warn('Error formatting data item:', item, error);
          return {
            ...item,
            date: item.period || 'Unknown',
            revenue: 0
          };
        }
      });
    } catch (error) {
      console.error('Error formatting chart data:', error);
      return [];
    }
  };

  // Safe date formatting
  const formatDate = (dateString, period) => {
    try {
      if (!dateString) return 'Unknown';

      if (period === "weekly") {
        dateString = String(dateString);
        return dateString.slice(0, 4) + ' week ' + dateString.slice(4, 6);
      }

      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid date 

      switch (period) {
        case "daily":
          // Show something like Nov 2 '25
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
        case "monthly":
          return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        default:
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
      }
    } catch (error) {
      console.warn('Error formatting date:', dateString, error);
      return dateString || 'Unknown';
    }
  };

  // Safe currency formatting
  const formatCurrency = (value) => {
    try {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return formatNumber(0);
      
      return formatNumber(numValue);
    } catch (error) {
      console.warn('Error formatting currency:', value, error);
      return formatNumber(0);
    }
  };

  // Get formatted data
  const chartData = formatData(data);

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="kyzn-chart-empty">
        <div className="kyzn-chart-empty-content">
          <h3>No Revenue Data</h3>
          <p>No data available for the selected period</p>
        </div>
      </div>
    );
  }

  // Error state - if data formatting failed
  if (chartData.length === 0) {
    return (
      <div className="kyzn-chart-error">
        <h3>Error Processing Data</h3>
        <p>Unable to process the revenue data</p>
      </div>
    );
  }

  return (
    <div className="kyzn-chart-container">
      <h2 className="kyzn-chart-title">{period.charAt(0).toUpperCase() + period.slice(1)} Revenue</h2>
      <div style={{ width: '100%', height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb"
              strokeOpacity={0.6}
            />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [formatCurrency(value), 'Revenue']}
              labelStyle={{ color: '#374151', fontWeight: '600' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="rgb(249, 115, 22)"
              strokeWidth={3}
              dot={{ 
                fill: "white", 
                stroke: "rgb(249, 115, 22)", 
                strokeWidth: 2, 
                r: 4 
              }}
              activeDot={{ 
                r: 6, 
                fill: "rgb(249, 115, 22)",
                stroke: "white",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
