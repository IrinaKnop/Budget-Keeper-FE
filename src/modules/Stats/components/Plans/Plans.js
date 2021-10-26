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
        editPlanErrorMessage: PropTypes.string,
        getAllPlans: PropTypes.func,
        addPlan: PropTypes.func,
        editPlan: PropTypes.func,
        deletePlan: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showEditCard: false,
            id: null,
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

    editShow = (idCard) => {
        const plan = this.props.listAllPlans.filter(plan => plan.id ===idCard);
        const dateEnd = plan[0].dateEnding === null? null : new Date(new Date(plan[0].dateEnding).setDate(new Date(plan[0].dateEnding).getDate() + 1)).toISOString().split("T")[0];
        this.setState({
            showEditCard: true,
            id: idCard,
            name: plan[0].name,
            value: plan[0].value,
            dateStart: new Date(new Date(plan[0].dateStart).setDate(new Date(plan[0].dateStart).getDate() + 1)).toISOString().split("T")[0],
            dateEnding:  dateEnd,
            progress: plan[0].progress,
            isAccumulate: plan[0].isAccumulate,
            isOpen: plan[0].isOpen,
        });
        console.log(plan);
        console.log(this.state);
    }

    editShowClose = () => {
        this.setState({
            showEditCard: false,
            id: "",
            name: "",
            value:"",
            dateEnding: "",
        })
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
        if (event.target.value === "Накопить") {
            this.setState({isAccumulate: true});
        }
        if (event.target.value != null && event.target.value !== "Выберите цель") {

            this.setState({isOpen: true});
        }
    }

    onValueChange = (event) => {
        this.setState({value: event.target.value});
    }

    onDateChange = (event) => {
        this.setState({dateEnding: event.target.value});
    }

    onClickDeleteButton = (planId) => {
        this.props.deletePlan({
            id: planId,
        });
        this.setState({showEditCard: false});
    }

    onSubmit = (event) => {

        const {name, value, dateStart, dateEnding, progress, isAccumulate, isOpen} = this.state;
        const addingPlanErrorMessage = this.props.addingPlanErrorMessage;

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

    onEditSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {id, name, value, dateStart, dateEnding, progress, isAccumulate, isOpen} = this.state;
        const editPlanErrorMessage = this.props.editPlanErrorMessage;

        this.props.editPlan({
            id,
            name,
            value,
            dateStart,
            dateEnding,
            progress,
            isAccumulate,
            isOpen,
        });
        if (editPlanErrorMessage == null) {
            this.setState({showEditCard: false});
        }
    }

    render() {
        const {id, show, showEditCard, name, value, dateEnding} = this.state;
        console.log(name, value, dateEnding);
        const listAllPlans = this.props.listAllPlans;
        console.log(this.state)

        return (
            <Row>
                {listAllPlans && listAllPlans.map((plan, i) =>
                    <Col className="plans-col">
                        <Card className="card-plans" onClick={() => this.editShow(plan.id)} style={{ cursor: "pointer" }}>
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
                <Modal show={showEditCard} onHide={this.editShowClose} centered>
                    <Form onSubmit={this.onEditSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать цель</Modal.Title>
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
                            <Button
                                variant="outline-danger"
                                onClick={() => this.onClickDeleteButton(id)}
                            >
                                Удалить
                            </Button>
                            <Button variant="secondary" onClick={this.editShowClose}>
                                Закрыть
                            </Button>
                            <Button variant="primary" type="submit" onSubmit={this.onEditSubmit}>
                                Сохранить
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
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