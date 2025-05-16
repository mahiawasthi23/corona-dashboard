import React, {useEffect, useState} from "react";
import axios from "axios";

function App(){
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try{
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(res.data);
    } catch (err) {
      alert("Failed to fetch countries.");
    }
  };


  const getCovidHistory = async (code) => {
    try {
      const res = await axios.get(
        `https://disease.sh/v3/covid-19/historical/${code}?lastdays=1500`
      );
      const timeline = res.data.timeline;

      const formattedData = Object.keys(timeline.cases).map((date) => {
        return {
          date,
          cases: timeline.cases[date],
          recovered: timeline.recovered[date],
          deaths: timeline.deaths[date],
        };
      });
      console.log("Covid data for:", code);
      console.log(formattedData);
    } catch (err) {
      alert("Failed to fetch COVID data.");
    }
  }; 

  useEffect(() => {
     getCountries();
  }, []);

  return (
    <div className="App">
      <h1>COVID-19 and Population Dashboard</h1>
    </div>
  );
    
}

export default App;