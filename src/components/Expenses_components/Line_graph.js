import React from "react";
import "./Expenses_style.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function Line_graphs({ line_graph_data }) {
  line_graph_data.map((item) => {
    item.month = monthNames[item.month - 1];
  });

  return (
    <div className="graphs line_graph">
      <div className="graph_heading">Monthly Expenses</div>
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={line_graph_data}>
          <CartesianGrid
            stroke="#FFFFFF"
            strokeDasharray="5 5"
            label={{ position: "top", value: "jsdhfksdj", fill: "#FFFFFF" }}
          />
         
          <XAxis dataKey="month" />
          <YAxis
            style={{ fill: "#ffffff" }}
            label={{
              value: "USD",
              fill: "#FFFFFF",
              angle: -90,
              position: "insideLeft",
            }}
          /> 
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#5500ff" dot={false} strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Line_graphs;
