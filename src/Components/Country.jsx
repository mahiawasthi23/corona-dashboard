import React from "react";
import {FiSearch, FiChevronDown} from "react-icons/fi";
import "./Country.css";

const Country = ({countries, onSelect, selectedCountry}) => {
    const sortedCountries = [...countries].sort((a,b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <div className="country-container">
            <div className="country-select">
                <FiSearch className="icon search-icon" />
                 <select onChange={(e) => onSelect(e.target.value)} className="country-dropdown" value={selectedCountry || ""}>
                 <option value=""disabled hidden>Search Country</option>
                 {sortedCountries.map((country, index) => (
                    <option key={index} value={country.cca2.toLowerCase()}>
                        {country.name.common}
                    </option>
                 ))}
                 </select>
                 <FiChevronDown className="icon dropdown-icon" />
            </div>
        </div>
    );
};

export default Country;