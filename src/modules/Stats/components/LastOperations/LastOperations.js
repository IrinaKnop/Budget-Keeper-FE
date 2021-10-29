import {Component} from "react";
import './LastOperations.css';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as operationsActions from "../../../Operations/redux";
import {connect} from "react-redux";
import {Table} from "react-bootstrap";

class LastOperations extends Component {
    static propTypes = {
        listLastPayments: PropTypes.arrayOf(PropTypes.shape({
                userId: PropTypes.number,
                incomeLabel: PropTypes.bool,
                date: PropTypes.array,
                categoryName: PropTypes.string,
                subcategoryName: PropTypes.string,
                value: PropTypes.number,
            }
        )),
        getLastPayments: PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getLastPayments(10);
    }

    render() {
        const lastPayments = this.props.listLastPayments;

        return (
            <div className="last-payments">
                <Table striped bordered hover size="sm" className="table-last-payments">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Вид</th>
                        <th>Сумма</th>
                        <th>Категория</th>
                        <th>Подкатегория</th>
                        <th>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        lastPayments && lastPayments.map((payment, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {payment.incomeLabel === true && (
                                    <td className="table-col-income">{payment.incomeLabel ? "Доход" : "Расход"}</td>
                                )}
                                {payment.incomeLabel === false && (
                                    <td className="table-col-expense">{payment.incomeLabel ? "Доход" : "Расход"}</td>
                                )}
                                <td>{payment.value.toLocaleString('ru-RU')}</td>
                                <td>{payment.categoryName}</td>
                                <td>{payment.subcategoryName}</td>
                                <td>{payment.date}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listLastPayments: state.payments.listLastPayments,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(operationsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LastOperations);