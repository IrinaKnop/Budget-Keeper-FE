import React, {Component} from "react";
import './InitialBalance.css';
import {Button, Form, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import * as initialBalanceActions from './redux';
import initializeBalance, {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class InitialBalance extends Component {
    static propTypes = {
        isInitialized: PropTypes.bool,
        initializeProcessing: PropTypes.bool,
        initialBalance: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            initialBalanceValue : null,
            initialBalanceErrorMessage: null,
        }
    }

    onValueChange = (event) => {
        this.setState({initialBalanceValue: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {initialBalanceValue} = this.state;

        const formValid = this.validateForm();
        if (formValid) {
            this.props.initialBalance({initialBalanceValue});
        }
    }

    validateForm = () => {
        if (this.state.initialBalanceValue < 0 ) {
            this.setState({initialBalanceErrorMessage: "Нельзя вводить отрицательные числа"})
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        const {isInitialized, history} = this.props;

        if(isInitialized) {
            history.push('/stats');
        }
    }

    render() {
    const {initialBalanceValue, initialBalanceErrorMessage} = this.state;
    const {initializeProcessing} = this.props;

        return (
            <div className="initialBalance">
                <h3>Начальный баланс</h3>
                <div className="initialBalance-form-wrapper">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Введите ваше текущее количество денежных средств</Form.Label>
                            <Form.Control required type="numeric" placeholder="0.00" value={initialBalanceValue} onChange={this.onValueChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Отправить
                        </Button>

                        { initializeProcessing && (
                            <Spinner animation="border" size="sm" variant="primary" />
                        )}

                        { initialBalanceErrorMessage && (
                            <p className="registration-error-message">
                                Ошибка: {initialBalanceErrorMessage}
                            </p>
                        )}

                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isInitialized: state.initializeBalance.isInitialized,
        initializeProcessing: state.initializeBalance.initializeProcessing,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(initialBalanceActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InitialBalance));