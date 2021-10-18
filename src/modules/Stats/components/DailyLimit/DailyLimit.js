import {Component} from "react";
import './DailyLimit.css';
import PropTypes from "prop-types";
import * as dailyLimitActions from '../../redux';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

class DailyLimit extends Component {
    static propTypes = {
        dailyLimit: PropTypes.number,
        getDailyLimit: PropTypes.func,
    }

    componentDidMount() {
        this.props.getDailyLimit();
    }

    render() {
        const {dailyLimit} = this.props;
        return (
            <div className="daily-limit">
                {dailyLimit != null && (
                    <div>
                        Лимит расходов на сегодня составляет: {dailyLimit} руб.
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dailyLimit: state.shortStats.dailyLimit,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dailyLimitActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyLimit);