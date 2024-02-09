import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";

const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const params = useParams();
  const [forecastData, setForecastData] = useState([]);
  const [radarUrl, setRadarUrl] = useState("");
  const [otherCitiesForecast, setOtherCitiesForecast] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (params.city) {
          let resp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=71ba00e14acd5e3366430162019c5cc3&units=metric`
          );
          if (resp.ok) {
            let data = await resp.json();
            setDetails(data);
            fetchForecast(data.coord.lat, data.coord.lon);
            fetchRadarUrl(data.coord.lat, data.coord.lon);
          } else {
            console.log("error fetching details");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchForecast = async (lat, lon) => {
      try {
        let resp = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=71ba00e14acd5e3366430162019c5cc3&units=metric`
        );
        if (resp.ok) {
          let data = await resp.json();
          setForecastData(data.daily);
        } else {
          console.log("error fetching forecast");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRadarUrl = async (lat, lon) => {
      const radarUrl = `https://www.weather.gov/jetstream/layer/clouds_max.html`;
      setRadarUrl(radarUrl);
    };

    // Esempio di città aggiuntive
    const otherCities = ["Sassari", "Bosa", "Bortigali"];
    const fetchOtherCitiesForecast = async () => {
      const promises = otherCities.map(async (city) => {
        try {
          let resp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71ba00e14acd5e3366430162019c5cc3&units=metric`
          );
          if (resp.ok) {
            let data = await resp.json();
            return data;
          } else {
            console.log(`error fetching forecast for ${city}`);
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      });
      const results = await Promise.all(promises);
      setOtherCitiesForecast(results.filter((data) => data !== null));
    };

    fetchDetails();
    fetchOtherCitiesForecast();
  }, [params.city]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNavbar>
        <Link to="/" className="navbar-brand">
          Home
        </Link>
      </MyNavbar>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        {details && (
          <div className="text-center">
            <h1>Hai cercato il meteo di: {details.name}</h1>{" "}
            <Card className="custom-card w-75 h-75">
              {" "}
              <Card.Body className="text-center">
                <h1 className="mb-4">{details.name}</h1>
                <Card.Text>
                  <strong>Temperature:</strong> {details.main.temp}°C
                </Card.Text>
                <Card.Text>
                  <strong>Description:</strong> {details.weather[0].description}
                </Card.Text>
                <Card.Text>
                  <strong>Humidity:</strong> {details.main.humidity}%
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <h3>Meteo che potrebbero interessarti</h3>
      </div>
      <Row className="justify-content-center mt-4">
        {otherCitiesForecast.map((cityData, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-5">
            {" "}
            <div className="text-center">
              <Card className="custom-card w-5 h-45">
                {" "}
                <Card.Body>
                  <h1 className="mb-4">{cityData.name}</h1>
                  <Card.Text>
                    <strong>Temperature:</strong> {cityData.main.temp}°C
                  </Card.Text>
                  <Card.Text>
                    <strong>Description:</strong>{" "}
                    {cityData.weather[0].description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Humidity:</strong> {cityData.main.humidity}%
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieDetails;
