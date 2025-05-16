import React, { useEffect, useState } from "react";
import { getCountries, getCovidHistory } from "./Api";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    const data = await getCountries();
    setCountries(data);
  };

  const fetchCovidData = async (code) => {
    const data = await getCovidHistory(code);
    if (!data || !data.timeline) {
      alert("COVID data unavailable");
      return;
    }

    const timeline = data.timeline;
    const formattedData = Object.keys(timeline.cases).map((date) => {
      return {
        date,
        cases: timeline.cases[date],
        recovered: timeline.recovered[date],
        deaths: timeline.deaths[date],
      };
    });

    const filteredData = formattedData.filter((entry) => {
      const [month, day, year] = entry.date.split("/");
      const entryDate = new Date(`20${year}-{month.padStart(2, "0")}-{day.padStart(2, "0")}`);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      return entryDate >= start && entryDate <=end;
    });
  };

  useEffect(() => {
    fetchCountries();
    fetchCovidData("us");
  }, []);

  return (
    <div className="App">
      <h1>COVID-19 and Population Dashboard</h1>
    </div>
  );
}

export default App;
