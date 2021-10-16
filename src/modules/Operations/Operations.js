import React, {Component} from "react";
import {Accordion, Card, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Header from "../../features/Header/Header";
import AddIncome from "./AddIncome";
import "./Operations.css"
import AddExpense from "./AddExpense/AddExpense";
import IncomeTable from "./IncomeTable/IncomeTable";

class Operations extends Component {
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
                    <Tabs defaultActiveKey="income" id="uncontrolled-tab-example" className="tabs-income-and-expenses">
                        <Tab eventKey="income" title="Доходы">
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0" className="tabs-card-accordion-header">
                                        Нажмите здесь, чтобы внести доход
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <AddIncome/>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <div>
                                Здесь будет таблица
                                <div>
                                    <IncomeTable/>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="expenses" title="Расходы">
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1" className="tabs-card-accordion-header">
                                        Нажмите здесь, чтобы внести расход
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <AddExpense/>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <div>
                                Здесь будет таблица
                            </div>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default Operations;