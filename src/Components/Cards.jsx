import React from "react";

const formatToMillions = (number) => {
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + "M";
  if (number >= 1_000) return (number / 1_000).toFixed(1) + "K";
  return number.toString();
};

const Cards = ({data}) => {
    const total = data.cases;
    const recovered = data.recovered;
    const deaths = data.deaths;

    const getPercent = (value) => {
        return total ? ((value / total) * 100).toFixed(1) + "%" : "M";
    };

 return (
    <div className="card-container">
        <div className="card cases">
            <h2>Total Cases</h2>
            <p>{formatToMillions(total)}</p>
            <small>{getPercent(total)}</small>
        </div>
        <div className="card recovered">
            <h2>Total Recovered</h2>
            <p>{formatToMillions(recovered)}</p>
            <small>{getPercent(recovered)}</small>
        </div>
        <div className="card cases">
            <h2>Total Deaths</h2>
            <p>{formatToMillions(deaths)}</p>
            <small>{getPercent(deaths)}</small>
        </div>
    </div>
 )
};

export default Cards;