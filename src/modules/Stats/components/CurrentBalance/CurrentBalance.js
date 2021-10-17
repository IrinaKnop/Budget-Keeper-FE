import {Component} from "react";
import PropTypes from "prop-types";
import * as currentBalanceActions from './redux';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

class CurrentBalance extends Component {
    static propTypes = {
        finalBalance: PropTypes.number,
        getCurrentBalance: PropTypes.func,
    }

    componentDidMount() {
        this.props.getCurrentBalance();
    }

    render() {
        const {finalBalance} = this.props;
        return (
            <div>
                {finalBalance != null && (
                    <div>
                    Текущий баланс: {finalBalance} руб.
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        finalBalance: state.currentBalance.finalBalance,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(currentBalanceActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBalance);

