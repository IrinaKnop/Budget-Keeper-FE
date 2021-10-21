import React, {Component} from "react";
import {Button, Card, Col, Form, Modal, ProgressBar, Row} from "react-bootstrap";
import "./Plans.css";
import PropTypes from "prop-types";
import * as statsActions from "../../redux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Plans extends Component {
    static propTypes = {
        listAllPlans: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            userId: PropTypes.number,
            name: PropTypes.string,
            value: PropTypes.number,
            dateStart: PropTypes.number,
            dateEnding: PropTypes.number,
            progress: PropTypes.number,
            isAccumulate: PropTypes.bool,
            isOpen: PropTypes.bool,
        })),
        addingPlanErrorMessage: PropTypes.string,
        getAllPlans: PropTypes.func,
        addPlan: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            name: null,
            value: null,
            dateStart: new Date().toISOString().split("T")[0],
            dateEnding: null,
            progress: null,
            isAccumulate: false,
            isOpen: false,
            formErrorMessage: null,
        }
    }

    componentDidMount() {
        this.props.getAllPlans();
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
        if (event.target.value === "Накопить") {
            this.setState({isAccumulate: true});
        }
    }

    onValueChange = (event) => {
        this.setState({value: event.target.value});
    }

    onDateChange = (event) => {
        this.setState({dateEnding: event.target.value});
    }

    onSubmit = (event) => {

        const {name, value, dateStart, dateEnding, progress, isAccumulate, isOpen} = this.state;
        const addingPlanErrorMessage = this.props.addingPlanErrorMessage;

        if (name != null && name !== "Выберите цель") {

            this.setState({isOpen: true});
        }


        this.props.addPlan({
            name,
            value,
            dateStart,
            dateEnding,
            progress,
            isAccumulate,
            isOpen,
        });

        if (addingPlanErrorMessage == null) {
            this.setState({show: false});
        }
    }

    render() {
        const {show, name, value, dateEnding} = this.state;
        console.log(name, value, dateEnding);
        const listAllPlans = this.props.listAllPlans;

        return (
            <Row>
                {listAllPlans && listAllPlans.map((plan, i) =>
                    <Col className="plans-col">
                        <Card className="card-plans">
                            <Card.Body className="card-plans-body">
                                <Card.Title className="card-plans-title">
                                    {plan.name} {plan.value.toLocaleString('ru-RU')}
                                </Card.Title>
                                <Card.Text className="card-plans-headline">Дата начала: </Card.Text>
                                <Card.Text>{new Date(plan.dateStart).toLocaleDateString()}</Card.Text>
                                <Card.Text className="card-plans-headline">Дата окончания: </Card.Text>
                                <Card.Text>
                                    {plan.dateEnding ? new Date(plan.dateEnding).toLocaleDateString() : "не задана"}
                                </Card.Text>
                                <ProgressBar variant="info" animated now={plan.progress} label={`${plan.progress}%`}/>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
                {
                    listAllPlans.length < 6 && (
                        <Col>
                            <Card className="card-plans-button">
                                <Button variant="light" className="button-add-plans"
                                        onClick={this.handleShow}>+</Button>
                            </Card>
                            <Modal show={show} onHide={this.handleClose} centered>
                                <Form onSubmit={this.onSubmit}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Добавить цель</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Цель</Form.Label>
                                            <Form.Control
                                                as="select"
                                                defaultValue="Выберите цель"
                                                required
                                                type="string"
                                                value={name}
                                                onChange={this.onNameChange}
                                            >
                                                <option value="">Выберите цель</option>
                                                <option value="Накопить">Накопить</option>
                                                <option value="Сэкономить">Сэкономить</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Сумма</Form.Label>
                                            <Form.Control
                                                required type="numeric"
                                                placeholder="0.00"
                                                value={value}
                                                onChange={this.onValueChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Планируемая дата завершения</Form.Label>
                                            <Form.Control
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={dateEnding}
                                                onChange={this.onDateChange}
                                            />
                                            <Form.Text className="text-muted">
                                                Это необязательное поле, цель завершится автоматически после выполнения
                                            </Form.Text>
                                        </Form.Group>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Закрыть
                                        </Button>
                                        <Button variant="primary" type="submit" onSubmit={this.onSubmit}>
                                            Добавить
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </Col>
                    )}

            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        listAllPlans: state.shortStats.listAllPlans,
        addingPlanErrorMessage: state.shortStats.addingPlanErrorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(statsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Plans);