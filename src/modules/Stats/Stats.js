import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UselessButton from "../../features/UselessButton/UselessButton";
import Header from "./components/Header";
import './Stats.css';

// READ https://react-bootstrap.netlify.app/layout/grid/#grid

class Stats extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        Left panel content
                    </Col>
                    <Col>
                        Stats page main content
                    </Col>
                </Row>
                <UselessButton />
            </Container>
        );
    }
}

export default Stats;