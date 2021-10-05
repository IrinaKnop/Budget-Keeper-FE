import React, {Component} from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect, withRouter} from "react-router-dom";

// READ https://react-bootstrap.netlify.app/components/navbar/#navbars

class Header extends Component{
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string,
        })
    }

    componentDidMount() {
        console.log(this.props.user);
        const { user } = this.props;
        if(user == null) {
            return this.props.history.push('/login');
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
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));