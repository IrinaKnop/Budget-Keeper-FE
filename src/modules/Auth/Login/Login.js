import React, { Component } from "react";
import PropTypes from 'prop-types';
import {Form, Button, Spinner} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../redux';
import './Login.css'
import UselessButton from "../../../features/UselessButton/UselessButton";

// READ https://react-bootstrap.netlify.app/components/forms/#forms

class Login extends Component {

    //READ https://ru.reactjs.org/docs/typechecking-with-proptypes.html
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        requestProcessing: PropTypes.bool,
        requestErrorMessage: PropTypes.string,
        login: PropTypes.func,
        checkAuth: PropTypes.func,
        history: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.state = {
            login: null,
            password: null,
            formValid: false,
        }
    }

    onLoginChange(event) {
        this.setState({login: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();        

        const { login, password } = this.state;

        this.props.login(login, password);
    }

    componentDidMount() {
        this.props.checkAuth();
    }

    // READ https://blog.logrocket.com/react-lifecycle-methods-tutorial-examples/
    componentDidUpdate(prevProps, prevState) {
        const { isLoggedIn, history } = this.props;

        if (isLoggedIn) {
            history.push('/stats');
        }
    }

    render() {
        const { login, password, formValid } = this.state;
        const { requestErrorMessage, requestProcessing } = this.props;

        return (
            <div className="login">
                <h1>Login</h1>
                <div className="login-form-wrapper">
                    <Form onSubmit={this.onSubmit} validated={formValid}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Login</Form.Label>
                            <Form.Control required type="text" placeholder="Enter login" value={login} onChange={this.onLoginChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Enter password" value={password} onChange={this.onPasswordChange}/>
                            <Form.Text className="text-muted">
                                Please, think up the strongest password you can
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                        { requestProcessing && (
                            <Spinner animation="border" size="sm" variant="primary" />
                        )}

                        { requestErrorMessage && (
                            <p className="login-error-message">
                                Login error: {requestErrorMessage}
                            </p>
                        )}
                    </Form>
                </div>
                <UselessButton />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));