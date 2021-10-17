import React, {Component} from "react";
import {Button, Col, Form,} from "react-bootstrap";
import './AddIncome.css';
import PropTypes from "prop-types";
import * as operationsActions from '../redux';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class AddIncome extends Component {
    static propTypes = {
        listCategories: PropTypes.shape(
            {
                incomeList: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    name: PropTypes.string,
                    uselessType: PropTypes.bool,
                    incomeLabel: PropTypes.bool,
                    listSubcategories: PropTypes.array
                })),
            }
        ),
        listPayments: PropTypes.arrayOf(PropTypes.shape( {
                userId: PropTypes.number,
                incomeLabel: PropTypes.bool,
                date: PropTypes.array,
                categoryName: PropTypes.string,
                subcategoryName: PropTypes.string,
                value: PropTypes.number,
            }
        )),
        addingProcessing: PropTypes.bool,
        isAddedPayment: PropTypes.bool,
        getCategories: PropTypes.func,
        addNewPayment: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            incomeLabel: true,
            date: null,
            categoryName: null,
            subcategoryName: null,
            value: null,
            addingErrorMessage: null,
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    onValueChange = (event) => {
        this.setState({value: event.target.value});
    }

    onCategoryChange = (event) => {
        this.setState({categoryName: event.target.value});
    }

    onSubcategoryChange = (event) => {
        this.setState({subcategoryName: event.target.value});
    }

    onDateChange = (event) => {
        this.setState({date: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {incomeLabel, date, categoryName, subcategoryName, value} = this.state;

        this.props.addNewPayment({
            incomeLabel,
            date,
            categoryName,
            subcategoryName,
            value
        });

        this.setState( {
            date: "",
            categoryName: "",
            subcategoryName: "",
            value: "",
        });
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const {isAddedPayment} = this.props;
    //     if (isAddedPayment) {
    //         this.props.getAllPayments();
    //     }
    // }

    render() {
        const {date, categoryName, subcategoryName, value} = this.state;
        const categoriesNames = this.props.listCategories?.incomeList
            .map(category => category.name);

        const subCategoriesNames = this.props.listCategories?.incomeList
            .filter(subcategory => subcategory.name === categoryName)
            .flatMap(subcategory => subcategory.listSubcategories)
            .map(subCategory => subCategory.name);
        console.log("CFGTJULIK " + value);

        return (
            <div className="income">
                <Form inline className="income-form" onSubmit={this.onSubmit}>
                    <Form.Group as={Col} controlId="formGridValue" className="income-form-group">
                        <Form.Label>Сумма</Form.Label>
                        <Form.Control required type="numeric" placeholder="0.00" value={value} onChange={this.onValueChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCategory" className="income-form-group">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control as="select" defaultValue="Выберите категорию" required type="string" value={categoryName} onChange={this.onCategoryChange}>
                            <option value={""}>Выберите категорию</option>
                            {
                                categoriesNames && categoriesNames
                                    .map((value, i) => <option key={i} value={value}>{value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSubcategory" className="income-form-group">
                        <Form.Label>Подкатегория</Form.Label>
                        <Form.Control as="select" defaultValue="Выберите подкатегорию" value={subcategoryName} onChange={this.onSubcategoryChange}>
                            <option value={""}>Выберите подкатегорию</option>
                            {
                                subCategoriesNames && subCategoriesNames
                                    .map((value, i) => <option key={i} value={value}>{value}</option>)
                            }

                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate" className="income-form-group">
                        <Form.Label>Дата</Form.Label>
                        <Form.Control required type="date" max={new Date().toISOString().split("T")[0]} value={date} onChange={this.onDateChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridButton" className="income-form-group">
                        <Button
                            variant="primary"
                            type="submit"
                            className="btn-income-form-group">
                            Отправить
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listCategories: state.payments.listCategories,
        addingProcessing: state.payments.addingProcessing,
        listPayments: state.payments.listPayments,
        isAddedPayment: state.payments.isAddedPayment,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(operationsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIncome);