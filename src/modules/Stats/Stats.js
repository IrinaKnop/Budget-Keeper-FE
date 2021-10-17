import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import UselessButton from "../../features/UselessButton/UselessButton";
import Header from "../../features/Header/Header";
import './Stats.css';
import DateAndTimeNow from "./components/DateAndTimeNow";
import CurrentBalance from "./components/CurrentBalance/CurrentBalance";
import LastOperations from "./components/LastOperations/LastOperations";
import DailyLimit from "./components/DailyLimit/DailyLimit";

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
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col className="left-panel">
                        Left panel content
                        <Row>
                            Здесь будет диаграмма
                        </Row>
                        <Row>
                            <DailyLimit/>
                        </Row>
                    </Col>
                    <Col className="right-half-page">
                        Stats page main content
                        <Row>
                            <Col>
                                <div>
                                    <DateAndTimeNow/>
                                </div>
                            </Col>
                            <Col md="auto">
                                <CurrentBalance/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="label-last-payments">
                                    Последние операции:
                                </div>
                                <LastOperations/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    Цели:
                </Row>
            </Container>
        );
    }
}

export default Stats;