import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";

export const CountriesList = (props) => {
  const { countries } = props;
  const [countriesData, setCountriesData] = useState(countries);
  const initialSortStatus = {
    name: false,
    area: false,
    population: false,
  };
  const [sortStatus, setSortStatus] = useState(initialSortStatus);
  const [summary, setSummary] = useState({
    average: 0,
    minimum: 0,
    maximum: 0,
  });

  const areaInSquareMiles = (areaInSquareKilometers) => {
    if (!areaInSquareKilometers) return;
    return Math.round(areaInSquareKilometers / 2.59);
  };

  const populationInMillions = (population) => {
    if (!population) return;
    return (population / 1000000).toFixed(1);
  };

  const sortCountries = (type) => {
    const countriesList = [...countries];
    switch (type) {
      case "name":
        if (sortStatus.name) {
          setSortStatus(() => ({ ...initialSortStatus, name: false }));
        } else {
          countriesList.sort((a, b) => (a.name > b.name ? 1 : -1));
          setSortStatus(() => ({ ...initialSortStatus, name: true }));
        }
        break;
      case "area":
        if (sortStatus.area) {
          setSortStatus(() => ({ ...initialSortStatus, area: false }));
        } else {
          countriesList.sort((a, b) => (a.area > b.area ? 1 : -1));
          setSortStatus(() => ({ ...initialSortStatus, area: true }));
        }
        break;
      case "population":
        if (sortStatus.population) {
          setSortStatus(() => ({ ...initialSortStatus, population: false }));
        } else {
          countriesList.sort((a, b) => (a.population > b.population ? 1 : -1));
          setSortStatus(() => ({ ...initialSortStatus, population: true }));
        }
        break;
      default:
        break;
    }
    setCountriesData(countriesList);
  };

  const averagePopulation = () => {
    const totalPopulation = countries.reduce((sum, country) => {
      return sum + country.population;
    }, 0);
    return totalPopulation / countries.length;
  };

  const minimumPopulation = () => {
    const minimum = countries.reduce((minimumPopulationCountry, country) => {
      if (country.population < minimumPopulationCountry.population)
        return country;
      return minimumPopulationCountry;
    });
    return minimum.population;
  };

  const maximumPopulation = () => {
    const maximum = countries.reduce((maximumPopulationCountry, country) => {
      if (country.population > maximumPopulationCountry.population)
        return country;
      return maximumPopulationCountry;
    });
    return maximum.population;
  };

  return (
    <div className="CountriesList">
      {!!countriesData && (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => sortCountries("name")}>
                  Name
                  {sortStatus.name && <i className="fa fa-arrow-down"></i>}
                </th>
                <th>Region</th>
                <th onClick={() => sortCountries("area")}>
                  Area (m<sup>2</sup>)
                  {sortStatus.area && <i className="fa fa-arrow-down"></i>}
                </th>
                <th onClick={() => sortCountries("population")}>
                  Population
                  {sortStatus.population && (
                    <i className="fa fa-arrow-down"></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {countriesData.map((country, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{country.name}</td>
                  <td>{country.region}</td>
                  <td>{areaInSquareMiles(country.area)}</td>
                  <td>{populationInMillions(country.population)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary">
            <h2>Summary</h2>
            <p>
              <b>Average</b> {averagePopulation()}
            </p>
            <p>
              <b>Minimum</b> {minimumPopulation()}
            </p>
            <p>
              <b>Maximam</b> {maximumPopulation()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
