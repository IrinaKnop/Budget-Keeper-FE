import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Header from "../../features/Header/Header";
import './Stats.css';
import DateAndTimeNow from "./components/DateAndTimeNow";
import CurrentBalance from "./components/CurrentBalance/CurrentBalance";
import LastOperations from "./components/LastOperations/LastOperations";
import DailyLimit from "./components/DailyLimit/DailyLimit";
import DiagramExampleComponent from "./components/DiagramExampleComponent";
import DiagramCurrentMonth from "./components/DiagramCurrentMonth";
import * as statsActions from "./redux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// READ https://react-bootstrap.netlify.app/layout/grid/#grid

class Stats extends Component {
    static propTypes = {
        listPaymentsShortStats: PropTypes.arrayOf(PropTypes.shape( {
            category: PropTypes.string,
            value: PropTypes.number
        }
        )),
        getShortPaymentsStats: PropTypes.func,
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getShortPaymentsStats();
    }

    render() {
        const data = this.props.listPaymentsShortStats;
        console.log(data);
        return (
            <Container>
                <Row>
                    <Col>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col className="left-panel">
                        Расходы в этом месяце:
                        <Row>
                            <DiagramCurrentMonth data = {data}/>
                        </Row>
                    </Col>
                    <Col className="right-panel">
                        <Row>
                            <Col>
                                <div>
                                    <DateAndTimeNow/>
                                </div>
                            </Col>
                            <Col md="auto">
                                <CurrentBalance/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="label-last-payments">
                                    Последние операции:
                                </div>
                                <LastOperations/>
                            </Col>
                        </Row>
                        <Row>
                            <DailyLimit/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    Цели:
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        listPaymentsShortStats: state.shortStats.listPaymentsShortStats,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(statsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
