import React from "react";
import "./Cards.css";

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
        <div className="card card-cases">
            <div className="cases">
                <h2>Total Cases</h2>
                <small>{getPercent(total)}</small>
            </div>
            <div className="card-side">
                <p>{formatToMillions(total)}</p>
            </div>
        </div>
        <div className="card card-recovered">
            <div className="recovered">
                <h2>Recovered</h2>
                <small>{getPercent(recovered)}</small>
            </div>
            <div className="card-side">
                <p>{formatToMillions(recovered)}</p>
            </div>
        </div>
        <div className="card card-deaths">
            <div className="deaths">
                <h2>Deaths</h2>
                <small>{getPercent(deaths)}</small>
            </div>
            <div className="card-side">
                <p>{formatToMillions(deaths)}</p>
            </div>
        </div>
    </div>
 )
};

export default Cards;