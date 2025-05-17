import React, { useEffect, useState } from "react";
import { getCountries, getCovidHistory } from "./Api";
import Country from "./Components/Country";
import Cards from "./Components/Cards";
import PieChartComponent from "./Components/PieChart";
import LineChartComponent from "./Components/LineChart";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [covidData, setCovidData] = useState(null);
  const [chartData, setChartData] =useState([]);
  const [dateRange, setDateRange] = useState({
    start: "2022-10-24",
    end: "2023-12-08",
  });

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
      const entryDate = new Date(`20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      return entryDate >= start && entryDate <=end;
    });

    setChartData(filteredData);
      
    if(filteredData.length > 0) {
      const total = filteredData.reduce(
        (acc, curr) => {
          acc.cases += curr.cases;
          acc.recovered += curr.recovered;
          acc.deaths += curr.deaths;
          return acc;
        },
        {cases: 0, recovered: 0, deaths: 0}
      );

      const PopulationRes = await axios.get(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      const Population = PopulationRes.data[0]?.Population || 0;

      setCovidData({
        cases: total.cases,
        recovered: total.recovered,
        deaths: total.deaths,
        Population: Population,
      });
    } else {
      setCovidData(null);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchCovidData(selectedCountry);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
        fetchCovidData(selectedCountry);
    }
  }, [selectedCountry, dateRange]);

  return (
    <div className="App">
      <div className="app-container">
      <h1>COVID-19 and Population Dashboard</h1>
      <div className="date-range-container">
        <Country countries={countries} onSelect={setSelectedCountry} selectedCountry={selectedCountry} />
          <div className="date">
             <div className="date-range">
               <label>Filter by Date Range</label>
            </div>
            <input type="date" value={dateRange.start} onChange={(e) =>
              setDateRange({...dateRange, start: e.target.value})
            }/>
            {" ~ "}
            <input type="date" value={dateRange.end} onChange={(e) =>
              setDateRange({...dateRange, end: e.target.value})
            }/>
          </div>
      </div>
         {covidData && (
           <> 
             <Cards data={covidData} />
             <div className="chart-container">
                <LineChartComponent data={chartData} />
                <PieChartComponent data={covidData} />
             </div>
           </>
         )}
         </div>
    </div>
  );
}

export default App;
