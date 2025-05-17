import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#21adf3", "#4caf50", "#f44336", "#ffbf00"];

const formatToReadable = (number) => {
    if(number >= 1_000_000) return (number / 1_000_000).toFixed(1) + "M";
    if(number >= 1_00) return (number / 1_000).toFixed(1) + "K";
    return number?.toString() || "0";
};

const PieChartComponent = ({ data }) => {
    const chartData = [
        { name: "Cases", value: data.cases },
        { name: "Recoverd", value: data.recovered },
        { name: "Deaths", value: data.deaths },
        {name: "Population", value: data.population},
    ];

     return (
    <div style={{ width: "100%", minHeight: "250px"}}>
      <h3 style={{marginBottom: "5px", marginLeft: "25px" }}>PieChart</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: ${formatToReadable(value)}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatToReadable(value)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;