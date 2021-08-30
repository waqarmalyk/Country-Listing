import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";

export const LanguageList = (props) => {
  const { countries } = props;
  const [languageData, setLanguageData] = useState();

  useEffect(() => {
    const data = [];
    countries.map((country) => {
      country.languages.map((language) => {
        if (data[language.name])
          data[language.name] = {
            countries: data[language.name].countries + ", " + country.name,
            population: data[language.name].population + country.population,
          };
        else
          data[language.name] = {
            countries: country.name,
            population: country.population,
          };
      });
    });
    setLanguageData(data);
  }, []);

  return (
    <div className="langaugeListing">
      {!!languageData && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Language</th>
              <th>Countries</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(languageData).map((language, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{language}</td>
                <td>{languageData[language].countries}</td>
                <td>{languageData[language].population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
