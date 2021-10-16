import {Component} from "react";
import {bindActionCreators} from "redux";
import * as operationsActions from "../redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Table} from "react-bootstrap";

class IncomeTable extends Component {
    static propTypes = {
        listPayments: PropTypes.arrayOf(PropTypes.shape( {
            userId: PropTypes.number,
            incomeLabel: PropTypes.bool,
            date: PropTypes.array,
            categoryName: PropTypes.string,
            subcategoryName: PropTypes.string,
            value: PropTypes.number,
            }
        )),
        isAddedPayment: PropTypes.bool,
        history: PropTypes.object,
        getAllPayments: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            incomeLabel: true,
        }
    }

    componentDidMount() {
        console.log("INCOME_TABLE");
        const incomeLabel = this.state.incomeLabel;
        this.props.getAllPayments(incomeLabel);
        console.log(this.props);
        this.forceUpdate();
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {history, isAddedPayment} = this.props;
        if(isAddedPayment) {
            history.push('/operations');
        }
    }

    render() {
        const payments = this.props.listPayments;
        console.log(payments);
        console.log(this.props);
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Сумма</th>
                        <th>Категория</th>
                        <th>Подкатегория</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                {
                    payments && payments.map((payment, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{payment.value}</td>
                                <td>{payment.categoryName}</td>
                                <td>{payment.subcategoryName}</td>
                                <td>{payment.date}</td>
                            </tr>
                        )
                }
                </tbody>
            </Table>
        )
    }
}

function mapStateToProps(state) {
    return {
        listPayments: state.payments.listPayments,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(operationsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeTable);