import {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import './DateAndTimeNow.css'

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
            <div className="date-and-time">
                <Container>
                    <Row>
                        <Col xs className="date-and-time-content-date">
                            Сегодня {this.state.date.toLocaleDateString()}
                        </Col>
                        <Col>
                            {this.state.date.toLocaleTimeString()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DateAndTimeNow;