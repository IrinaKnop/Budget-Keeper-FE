import React, {Component} from "react";
import PropTypes from "prop-types";
import './UselessExpenses.css';
import {bindActionCreators} from "redux";
import * as analyticActions from "../redux";
import {connect} from "react-redux";

class UselessExpenses extends Component {
    static propTypes = {
        listUselessPayments: PropTypes.arrayOf(PropTypes.shape({
            category: PropTypes.string,
            subcategory: PropTypes.string,
            value: PropTypes.number
        })),
        getUselessPayments: PropTypes.func,
        dateStart: PropTypes.number,
        dateEnd: PropTypes.number,
    }

    componentDidMount() {
        this.props.getUselessPayments(this.props.dateStart, this.props.dateEnd);
    }

    render() {
        const listUselessPayments = this.props.listUselessPayments;
        const total = listUselessPayments.reduce((prev, next) => prev + next.value, 0);

        return(
            <div className="useless-expenses">
                {listUselessPayments == null || listUselessPayments == [] && (
                    <div className="useless-expenses-header">
                        За указанный период "бесполезные" расходы не совершались. Замечательно!
                    </div>
                )}
                {listUselessPayments && (
                    <div className="useless-expenses-header">
                        "Бесполезные" расходы составили: {total.toLocaleString('ru-RU')} руб.
                    </div>
                )}
                {listUselessPayments && listUselessPayments
                    .filter(item => item.subcategory == null)
                    .map((item, index) =>
                        <div className="useless-expenses-text">По категории "{item.category}": {item.value.toLocaleString('ru-RU')} руб. </div>)
                }
                {listUselessPayments && listUselessPayments
                    .filter(item => item.subcategory)
                    .map((item, index) =>
                        <div className="useless-expenses-text">По категории "{item.category}" в подкатегории "{item.subcategory}": {item.value.toLocaleString('ru-RU')} руб. </div>)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listUselessPayments: state.analytics.listUselessPayments,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analyticActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UselessExpenses);