import "./HolidayList.css";

import { useState, useEffect } from "react";

export default function HolidayList() {
  const API_BASE = "https://openholidaysapi.org";

  const [countries, setCountries] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("NL");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch(`${API_BASE}/Countries?languageIsoCode=en`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Countries data:", data);
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    fetch(
      `${API_BASE}/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=en`
    )
      .then((response) => response.json())
      .then((data) => {
        setHolidays(data);
      })
      .catch((error) => console.error("Error fetching holidays:", error));
  }, [selectedCountry]);

  return (
    <div className="holiday-container container-sm mt-4">
      <h1 className="holiday-title mb-4"> Public Holidays {currentYear}</h1>
      <h2>Countries</h2>

      <select
        className="holiday-select form-select mb-3"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name && country.name[0]
              ? country.name[0].text
              : country.isoCode}
          </option>
        ))}
      </select>
      <div>
        {holidays.length > 0 ? (
          <ul className="list-group">
            {holidays.map((holiday) => (
              <li className="list-group-item" key={holiday.id}>
                {holiday.startDate} - {holiday.name[0].text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No holidays found for the selected country.</p>
        )}
      </div>
    </div>
  );
}
