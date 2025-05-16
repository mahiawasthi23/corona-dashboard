import React, {useEffect, useState} from "react";
import {getCountries, getCovidHistory} from "./Api";

function App(){
  const [countries, setCountries] = useState([]);

const fetchCountries = async () => {
  const data = await getCountries();
  setCountries(dada);
};


const fetchCovidData = async (code) => {
  const data = await getCovidHistory(code);
  if(!data || !data.timeline) {
    alert("COVID data unavailable,");
    return;
  }
}

  return (
    <div className="App">
      <h1>COVID-19 and Population Dashboard</h1>
    </div>
  );
    
}

export default App;