import React from "react";
import { Container } from "react-bootstrap";
import "../App.css";
import About from "./About";
import Catalog from "./Catalog";
const Home = () => {
  return (
    <>
      <About />
      <Container>
        <Catalog/>
      </Container>
    </>
  );
};

export default Home;
