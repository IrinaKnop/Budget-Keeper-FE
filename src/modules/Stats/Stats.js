import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UselessButton from "../../features/UselessButton/UselessButton";
import Header from "../../features/Header/Header";
import './Stats.css';
import DateAndTimeNow from "./components/DateAndTimeNow";
import CurrentBalance from "./components/CurrentBalance/CurrentBalance";

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
                    <Col md="auto">
                        Left panel content
                        <Row>

                        </Row>
                    </Col>
                    <Col xs>
                        Stats page main content
                        <Row>
                            <Col>
                                <div>
                                    <DateAndTimeNow />
                                </div>
                            </Col>
                            <Col md="auto">
                                <CurrentBalance />
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <UselessButton />
            </Container>
        );
    }
}

export default Stats;