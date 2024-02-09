// HomePage.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Carousel,
  Spinner, // Importa Spinner da react-bootstrap
} from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link } from "react-router-dom"; // Importa Link

const HomePage = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // Stato per gestire il caricamento
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiKey = "71ba00e14acd5e3366430162019c5cc3";
  const cities = ["Milan", "Rome", "Florence"];

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true); // Attiva lo spinner di caricamento
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false); // Disattiva lo spinner di caricamento dopo aver completato la richiesta
    }
  };

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      const weatherDataList = await Promise.all(
        cities.map((city) => fetchWeatherData(city))
      );
      setWeatherData(weatherDataList);
    };

    fetchAllWeatherData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/details/${city}`); // Naviga alla pagina dei dettagli del meteo
  };

  const getImageUrlForCity = (cityName) => {
    switch (cityName) {
      case "Milan":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrAonG7Z-qEfwMk6UHTpwND0HDYPvDMCtqdQ&usqp=CAU";
      case "Rome":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Foro_Romano_Musei_Capitolini_Roma.jpg/1200px-Foro_Romano_Musei_Capitolini_Roma.jpg";
      case "Florence":
        return "https://www.shutterstock.com/image-photo/florence-tuscany-italy-panorama-sunset-260nw-1974881198.jpg";
      default:
        return "";
    }
  };

  return (
    <>
      <MyNavbar />
      <Container className="mt-4" style={{ backgroundColor: "white" }}>
        <Row>
          <Col>
            <h1 className="text-center mb-4">Welcome Sunny Smiles</h1>
            <p className="lead text-center">
              Get the latest weather forecast for any city!
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Check Weather</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formCity">
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Get Weather
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {loading && ( // Mostra lo spinner di caricamento se loading è true
          <Row className="justify-content-center mt-4">
            <Col md={6} className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        )}
        {error && (
          <Row className="justify-content-center mt-4">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Error</h2>
                  <p className="text-center">{error}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <Row className="mt-4">
          <Col>
            <Carousel>
              {weatherData &&
                weatherData.map((data, index) => (
                  <Carousel.Item key={index} style={{ height: "400px" }}>
                    {" "}
                    {/* Aggiunto lo stile per uniformare l'altezza delle immagini */}
                    <img
                      className="d-block w-100"
                      src={getImageUrlForCity(cities[index])}
                      alt={`${cities[index]} slide`}
                      style={{ objectFit: "cover", height: "100%" }} // Aggiunto lo stile per uniformare le dimensioni delle immagini
                    />
                    <Carousel.Caption>
                      <h3>{cities[index]}</h3>
                      {data && (
                        <>
                          <p>
                            <strong>Temperature:</strong> {data.main.temp}°C
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {data.weather[0].description}
                          </p>
                          <p>
                            <strong>Humidity:</strong> {data.main.humidity}%
                          </p>
                        </>
                      )}
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
