import {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";

class DateAndTimeNow extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs></Col>
                        <Col md="auto" xs={{ order: 12 }}>
                            {this.state.date.toLocaleDateString()}
                        </Col>
                        <Col md="auto" xs={{ order: 1 }}>
                            {this.state.date.toLocaleTimeString()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DateAndTimeNow;