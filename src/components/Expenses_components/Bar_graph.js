import React from "react";
import "./Expenses_style.css";
import {
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
 
} from "recharts";

function Bar_graph({ Bar_graph_data }) {
  
  return (
    <div className="graphs bar_graph">
    <p className="graph_heading">Monthly Expense by Category</p>
      <ResponsiveContainer height="70%" width="90%">
        <BarChart  data={ Bar_graph_data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="category"  />
          <YAxis label={{
              value: "USD",
              fill: "#FFFFFF",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#5500ff" barSize={40} />
         
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Bar_graph;
