import React,{ useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const formattedDate = (dateStr) => {
    if(!dateStr) return "";
    const [month, day, year] = dateStr.split("/");
    return `${day}-${month}-20${year}`;
};

const formatToReadable = (number) => {
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + "M";
  if (number >= 1_000) return (number / 1_000).toFixed(1) + "K";
  return number?.toString() || "0";
};

const CustomTooltip = ({ active, payload, label, hoveredKey }) => {
    if(!active || !payload || payload.length === 0) return null;

    const filtered = payload.find((entry) => entry.dataKey === hoveredKey);
    if (!filtered) return null;

    return (
         <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
            <p><strong>Date:</strong> {formattedDate(label)}</p>
            <p style={{ color: filtered.stroke }}>
                <strong>{filtered.name}:</strong> {formatToReadable(filtered.value)}
            </p>
        </div>
    );
};

const LineChartComponent = ({ data }) => {
    const [hoveredKey, setHoveredKey] = useState("cases");

    return (
    <div style={{ width: "100%",  minHeight:  "280px"}}>
      <h3 style={{marginBottom: "5px", marginLeft: "25px" }}>LineChart</h3>
      <ResponsiveContainer  width="100%" height={250}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formattedDate}
            minTickGap={20}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tickFormatter={formatToReadable} />
          <Tooltip content={<CustomTooltip hoveredKey={hoveredKey} />} />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="cases"
            name="Cases"
            stroke="#2196f3"
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            onMouseOver={() => setHoveredKey("cases")}
          />
          <Line
            type="monotone"
            dataKey="recovered"
            name="Recovered"
            stroke="#4caf50"
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            onMouseOver={() => setHoveredKey("recovered")}
          />
          <Line
            type="monotone"
            dataKey="deaths"
            name="Deaths"
            stroke="#f44336"
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            onMouseOver={() => setHoveredKey("deaths")}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;

