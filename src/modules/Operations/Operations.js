import React, {Component} from "react";
import {Accordion, Card, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Header from "../../features/Header/Header";
import AddIncome from "./AddIncome";
import "./Operations.css"
import AddExpense from "./AddExpense/AddExpense";
import IncomeTable from "./IncomeTable/IncomeTable";
import ExpenseTable from "./ExpenseTable/ExpenseTable";

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
                            <p className="text-tabs-income-and-expenses">Добавить операцию с доходом</p>
                            <div>
                                <AddIncome/>
                            </div>
                            <div>
                                <IncomeTable/>
                            </div>
                        </Tab>
                        <Tab eventKey="expenses" title="Расходы">
                            <p className="text-tabs-income-and-expenses">Добавить операцию с расходом</p>
                            <div>
                                <AddExpense/>
                            </div>
                            <div>
                                <ExpenseTable/>
                            </div>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        )
    }
}

export default Operations;