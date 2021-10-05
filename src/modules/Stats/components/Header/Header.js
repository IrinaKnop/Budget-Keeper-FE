import React, {Component} from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import * as loginActions from '../../../Auth/redux';
import { bindActionCreators } from "redux";


// READ https://react-bootstrap.netlify.app/components/navbar/#navbars

class Header extends Component{
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string,
        }),
        isLoggedIn: PropTypes.bool,
        history: PropTypes.object,
        checkAuth: PropTypes.func,
    }

    componentDidMount() {
        this.props.checkAuth();
        // forceUpdate() здесь нужен для того, чтобы ЗАСТАВИТЬ компонент обновиться после выполнения checkAuth.
        // Дело в том, что в случае, когда пользователь не залогинен, пропсы, приходящие в компонент не поменяются после выполнения checkAuth.
        // Все пропсы останутся в старом значении.
        // В частности, isLoggedIn (а т) был false и останется false. И компонент решит, что ничего не поменялось, и componentDidUpdate не вызовется.
        // Нам же надо чтобы componentDidUpdate все таки вызвался, даже если значения пропсов не поменяются.
        this.forceUpdate();
    }

    componentDidUpdate(prevProps, prevState) {
        const { isLoggedIn, history } = this.props;

        console.log('componentDidUpdate isLoggedIn: '+isLoggedIn);
        if (!isLoggedIn) {
            history.push('/login');
        }
    }

    render() {
        const { user } = this.props;

        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/login">My app</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/stats">Stats</Nav.Link>
                            <Nav.Link href="https://pikabu.ru">Fuck it!</Nav.Link>
                        </Nav>
                        <Nav>
                            {user != null && (
                                <Navbar.Text>
                                    {user.login}
                                </Navbar.Text>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.login.user,
        isLoggedIn: state.login.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));