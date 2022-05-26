import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

import q from "../media/slider/1.jpg"
import w from "../media/slider/3.jpg"
import e from "../media/slider/6.jpg"
import r from "../media/slider/7.jpg"
import t from "../media/slider/8.jpg"
const API_PRODUCT = "http://localhost:8080/products";

const Slider = () => {
    const [product, setProduct] = useState([]);
    const [idProduct, setIdProduct] = useState("");
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [file, setFile] = useState(null)

    const [user, setUser] = useState(undefined);
    const [admin, setAdmin] = useState(false);

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Carousel activeIndex={index}
                        onSelect={handleSelect}
                        className='carousel-dark'
                        class=" carousel carousel-dark"
                    >
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={q}
                                alt="product"

                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={r}
                                alt="product"

                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={e}
                                alt="product"

                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={w}
                                alt="product"

                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={t}
                                alt="product"

                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            
        </Container>
            

        </>
    );
};
export default Slider;