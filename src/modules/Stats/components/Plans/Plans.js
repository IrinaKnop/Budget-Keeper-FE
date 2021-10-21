import {Component} from "react";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import "./Plans.css";

class Plans extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        }
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    render() {
        const {show} = this.state;
        console.log(show);
        return (
            <Row>
                <Col>
                    <Card className="card-plans">
                        <Button variant="light" className="button-add-plans" onClick={this.handleShow}>+</Button>
                    </Card>
                </Col>
                <Modal show={show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default Plans;