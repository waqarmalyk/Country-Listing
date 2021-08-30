import axios from "axios";
import { useEffect, useState } from "react";
import { CountriesList } from "./CountriesList";
import { LanguageList } from "./LanguageList";

export const App = () => {
  const [countriesData, setCountriesData] = useState();
  const [showCountriesList, setShowCountriesList] = useState(true);

  useEffect(() => {
    getCountriesData();
  }, []);

  const getCountriesData = async () => {
    const result = await axios.get("https://restcountries.eu/rest/v2/all");
    if (result.data) {
      setCountriesData(result.data);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Country Listing</h1>
        <ul>
          <li
            className={showCountriesList ? "active" : ""}
            onClick={() => setShowCountriesList(true)}
          >
            Country List
          </li>
          <li
            className={!showCountriesList ? "active" : ""}
            onClick={() => setShowCountriesList(false)}
          >
            Language List
          </li>
        </ul>
      </header>
      <main>
        {countriesData &&
          (showCountriesList ? (
            <CountriesList countries={countriesData} />
          ) : (
            <LanguageList countries={countriesData} />
          ))}
      </main>
      <footer className="footer">
        <p>Ⓒ MERCELL - 2021</p>
      </footer>
    </div>
  );
};

export default App;
