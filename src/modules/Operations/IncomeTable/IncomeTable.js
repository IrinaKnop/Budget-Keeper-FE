import React, {Component} from "react";
import {bindActionCreators} from "redux";
import * as operationsActions from "../redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, Table} from "react-bootstrap";
import {deletePayment} from "../redux";

class IncomeTable extends Component {
    static propTypes = {
        listPayments: PropTypes.arrayOf(PropTypes.shape( {
            userId: PropTypes.number,
            id: PropTypes.number,
            incomeLabel: PropTypes.bool,
            date: PropTypes.array,
            categoryName: PropTypes.string,
            subcategoryName: PropTypes.string,
            value: PropTypes.number,
            }
        )),
        getAllPayments: PropTypes.func,
        deletePayment: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            incomeLabel: true,
        }
    }

    componentDidMount() {
        this.props.getAllPayments();
        console.log(this.props);
        this.forceUpdate();
    }

    onClickDeleteRow = (paymentId) => {
        this.props.deletePayment({
            id: paymentId,
        });
}

    componentDidUpdate(prevProps, prevState, snapshot) {
        // const {history, isAddedPayment} = this.props;
        // if(isAddedPayment) {
        //     history.push('/operations');
        // }
    }

    render() {
        const payments = this.props.listPayments.filter(payment => payment.incomeLabel === true);
        const id = this.state.id;
        console.log(id);
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
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>{payment.value.toLocaleString('ru-RU')}</td>
                                <td>{payment.categoryName}</td>
                                <td>{payment.subcategoryName}</td>
                                <td>{payment.date}</td>
                                <td>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => this.onClickDeleteRow(payment.id)}
                                    >
                                        Удалить
                                    </Button>
                                </td>
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