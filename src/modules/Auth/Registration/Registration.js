import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import "./Registration.css";
import {bindActionCreators} from "redux";
import * as loginActions from "../redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class Registration extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        requestProcessing: PropTypes.bool,
        requestErrorMessage: PropTypes.string,
        signup: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            lastName: null,
            email: null,
            login: null,
            password: null,
            formValid: false,
            signupErrorMessage: null
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    onLastNameChange = (event) => {
        this.setState({lastName: event.target.value});
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    onLoginChange = (event) => {
        this.setState({login: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { name, lastName, email, login, password } = this.state;

        const formValid = this.validateForm();
        this.setState({formValid});
        if (formValid) {
            this.props.signup({
                name,
                lastName,
                email,
                login,
                password
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { isLoggedIn, history } = this.props;

        if (isLoggedIn) {
            history.push('/initialize');
        }
    }

    validateForm = () => {
        if (this.state.password.length < 5 ) {
            this.setState({signupErrorMessage: "Password too short"})
            return false;
        }
        return true;
    }

    render() {
        const { name, lastName, email, login, password, signupErrorMessage } = this.state;
        const { requestErrorMessage, requestProcessing } = this.props;

        return (
            <div className="registration">
                <h3>??????????????????????</h3>
                <div className="registration-form-wrapper">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>??????</Form.Label>
                            <Form.Control required type="text" placeholder="?????????????? ??????" value={name} onChange={this.onNameChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>??????????????</Form.Label>
                            <Form.Control required type="text" placeholder="?????????????? ??????????????" value={lastName} onChange={this.onLastNameChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>?????????????????????? ??????????</Form.Label>
                            <Form.Control required type="email" placeholder="?????????????? e-mail" value={email} onChange={this.onEmailChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>??????????</Form.Label>
                            <Form.Control required type="text" placeholder="???????????????????? ??????????" value={login} onChange={this.onLoginChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>????????????</Form.Label>
                            <Form.Control required type="password" placeholder="???????????????????? ????????????" value={password} onChange={this.onPasswordChange}/>
                            <Form.Text className="text-muted">
                                ?????????? ???????????? ???????????? ???????? ???? ?????????? 5 ????????????????
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            ????????????????????????????????????
                        </Button>

                        { requestProcessing && (
                            <Spinner animation="border" size="sm" variant="primary" />
                        )}

                        { requestErrorMessage && (
                            <p className="registration-error-message">
                                Login error: {requestErrorMessage}
                            </p>
                        )}
                        { signupErrorMessage && (
                            <p className="registration-error-message">
                                Password error: {signupErrorMessage}
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
        isLoggedIn: state.login.isLoggedIn,
        requestProcessing: state.login.requestProcessing,
        requestErrorMessage: state.login.requestErrorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(loginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration));

