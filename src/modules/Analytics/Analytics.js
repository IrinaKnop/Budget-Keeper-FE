import React, {Component} from "react";
import PropTypes from "prop-types";
import './Analytics.css';
import * as analyticActions from "./redux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import Header from "../../features/Header/Header";
import DiagramAnalytics from "./DiagramAnalytics";
import {debounce} from "debounce";
import GraphAnalytics from "./GraphAnalytics";

class Analytics extends Component {
    static propTypes = {
        listPaymentsAnalytics: PropTypes.arrayOf(PropTypes.shape({
            category: PropTypes.string,
            value: PropTypes.number
        })),
        listCategories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            uselessType: PropTypes.bool,
            incomeLabel: PropTypes.bool,
        })),
        listGraphAnalytics: PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.string,
            income: PropTypes.number,
            expense: PropTypes.number
        })),
        getAllCategoriesByPeriod: PropTypes.func,
        getStatsByIncomeLabel: PropTypes.func,
        getStatsBySubcategory: PropTypes.func,
        getGraphStatsByPeriod: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            incomeLabel: false,
            categoryName: "",
            dateStart: new Date(new Date().setDate(1)).toISOString().split("T")[0],
            dateEnd: new Date().toISOString().split("T")[0],
            dateErrorMessage: null,
        }
    }

    componentDidMount() {
        const incomeLabel = this.state.incomeLabel;
        const dateStart = new Date(new Date().setDate(1));
        const dateEnd = new Date();
        this.props.getStatsByIncomeLabel({
            incomeLabel,
            dateStart,
            dateEnd
        });
        this.props.getAllCategoriesByPeriod(
            dateStart.toISOString().split("T")[0],
            dateEnd.toISOString().split("T")[0]);
        this.props.getGraphStatsByPeriod(
            dateStart.toISOString().split("T")[0],
            dateEnd.toISOString().split("T")[0]);
    }

    onIncomeLabelChange = (event) => {
        this.validateCategoryName();
        this.setState({incomeLabel: event.target.value === "true"});
        this.submitForm();
    }

    onCategoryChange = (event) => {
        this.setState({categoryName: event.target.value});
        this.submitForm();
    }

    onDateStartChange = (event) => {
        this.validateCategoryName();
        this.setState({dateStart: event.target.value});
        this.submitForm();
    }

    onDateEndChange = (event) => {
        this.validateCategoryName();
        this.setState({dateEnd: event.target.value});
        this.submitForm();
    }

    submitForm = debounce(() => {
            const {incomeLabel, categoryName, dateStart, dateEnd} = this.state;

            this.props.getAllCategoriesByPeriod(
                dateStart,
                dateEnd);

            const formValid = this.validateDates();

            if (formValid) {
                this.setState({dateErrorMessage: null});

                if (categoryName === "") {
                    this.props.getStatsByIncomeLabel({
                        incomeLabel,
                        dateStart,
                        dateEnd
                    });
                } else if (categoryName !== "") {
                    this.props.getStatsBySubcategory({
                        incomeLabel,
                        categoryName,
                        dateStart,
                        dateEnd
                    });
                }
                this.props.getGraphStatsByPeriod(dateStart, dateEnd);
            }
        },
        500,);

    validateCategoryName = () => {
        if (!(this.props.listCategories.filter(category => category.name === this.state.categoryName) === this.state.categoryName)) {
            return this.setState({categoryName: ""});
        }
    }

    validateDates = () => {
        if (this.state.dateStart > this.state.dateEnd) {
            this.setState({dateErrorMessage: "Неверно выбраны даты"});
            return false;
        }
        return true;
    }

    render() {
        const {incomeLabel, categoryName, dateStart, dateEnd, dateErrorMessage} = this.state;

        const data = this.props.listPaymentsAnalytics;
        const dataGraph = this.props.listGraphAnalytics;
        const listCategories = this.props.listCategories;
        const total = data.reduce((prev,next) => prev + next.value, 0);

        return (
            <Container>
                <Row>
                    <Col>
                        <Header/>
                    </Col>
                </Row>
                <Row className="analytics">
                    <Form inline className="analytics-form" onChange={this.submitForm}>
                        <FormGroup as={Col} xs="auto" className="analytics-form-group">
                            <Form.Control
                                as="select"
                                defaultValue="Расходы"
                                value={incomeLabel}
                                onChange={this.onIncomeLabelChange}
                            >
                                <option value={false}>Расходы</option>
                                <option value={true}>Доходы</option>
                            </Form.Control>
                        </FormGroup>
                        <Form.Group as={Col} xs="auto" className="analytics-form-group">
                            <Form.Control
                                as="select"
                                defaultValue="Все категории"
                                value={categoryName}
                                onChange={this.onCategoryChange}
                            >
                                <option value={""}>Все категории</option>
                                {
                                    listCategories && listCategories
                                        .filter(category => category.incomeLabel === incomeLabel)
                                        .map(category => category.name)
                                        .map((name, i) => <option key={i} value={name}>{name}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <FormGroup as={Col} xs="auto" className="analytics-form-group">
                            <p className="analytics-form-group-text"> за период с: </p>
                        </FormGroup>
                        <FormGroup as={Col} xs="auto" className="analytics-form-group">
                            <Form.Control
                                required
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                                value={dateStart}
                                onChange={this.onDateStartChange}
                            />
                        </FormGroup>
                        <FormGroup as={Col} xs="auto" className="analytics-form-group">
                            <p className="analytics-form-group-text"> по: </p>
                        </FormGroup>
                        <FormGroup as={Col} xs="auto" className="analytics-form-group">
                            <Form.Control
                                required
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                                value={dateEnd}
                                onChange={this.onDateEndChange}
                            />
                        </FormGroup>
                    </Form>
                </Row>
                {dateErrorMessage && (
                    <Row>
                        <p className="analytics-error-message">
                            Ошибка: {dateErrorMessage}
                        </p>
                    </Row>
                )}
                <Row>
                    <Col>
                        <Row>
                            {data && (
                                <p className="analytics-text">
                                    Общая сумма: {total.toLocaleString('ru-RU')} руб.
                                </p>
                            )}
                        </Row>
                        <Row>
                            <DiagramAnalytics data={data}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <p className="analytics-text">
                                Общие суммы доходов и расходов:
                            </p>
                        </Row>
                        <Row>
                        <GraphAnalytics data={dataGraph}/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }

}

function mapStateToProps(state) {
    return {
        listCategories: state.analytics.listCategories,
        listPaymentsAnalytics: state.analytics.listPaymentsAnalytics,
        listGraphAnalytics: state.analytics.listGraphAnalytics,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analyticActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);

