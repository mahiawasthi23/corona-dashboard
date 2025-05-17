import React from "react";
import {FiSearch, FiChevronDown} from "react-icons/fi";

const Country = ({countries, onSelect, selectedCountry}) => {
    const sortedCountries = [...countries].sort((a,b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <div className="custom-dropdown-container">
            <div className="custom-select-wrapper">
                <FiSearch className="icon search-icon" />
                 <select onChange={(e) => onSelect(e.target.value)} className="custom-dropdown" value={selectedCountry || ""}>
                 <option value=""disabled hidden>Search Country</option>
                 {sortedCountries.map((country, index) => (
                    <option key={index} value={country.cca2.toLowerCase()}>
                        {country.name.common}
                    </option>
                 ))}
                 </select>
            </div>
        </div>
    );
};

export default Country;