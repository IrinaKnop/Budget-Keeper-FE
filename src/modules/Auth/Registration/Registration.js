import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
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
        //this.props.login(email, password);
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
            history.push('/stats');
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
        const { requestErrorMessage } = this.props;


        return (
            <div class="registration">
                <h1>Registration</h1>
                <div class="registration-form-wrapper">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter name" value={name} onChange={this.onNameChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter last name" value={lastName} onChange={this.onLastNameChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control required type="email" placeholder="Enter e-mail" value={email} onChange={this.onEmailChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Login</Form.Label>
                            <Form.Control required type="text" placeholder="Enter login" value={login} onChange={this.onLoginChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Enter password" value={password} onChange={this.onPasswordChange}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

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

