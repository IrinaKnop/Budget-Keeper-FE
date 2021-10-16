import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, Form} from "react-bootstrap";
import './AddExpense.css';
import {bindActionCreators} from "redux";
import * as operationsActions from "../redux";
import {connect} from "react-redux";

class AddExpense extends Component {
    static propTypes = {
        listCategories: PropTypes.shape(
            {
                expensesList: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    name: PropTypes.string,
                    uselessType: PropTypes.bool,
                    incomeLabel: PropTypes.bool,
                    listSubcategories: PropTypes.array
                })),
            }
        ),
        addingProcessing: PropTypes.bool,
        isAddedPayment: PropTypes.bool,
        getCategories: PropTypes.func,
        addNewPayment: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            incomeLabel: false,
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
        })

        //такое очищение формы не рабтает
        // this.setState( prevState => ({
        //     date: null,
        //     categoryName: null,
        //     subcategoryName: null,
        //     value: null,
        // }));
    }

    render() {
        console.log("Рендер добавления доходов");
        const {date, categoryName, subcategoryName, value} = this.state;
        const categoriesNames = this.props.listCategories?.expensesList
            .map(category => category.name);

        const subCategoriesNames = this.props.listCategories?.expensesList
            .filter(subcategory => subcategory.name === categoryName)
            .flatMap(subcategory => subcategory.listSubcategories)
            .map(subCategory => subCategory.name);
        console.log(categoryName);
        console.log(categoriesNames);
        console.log(subCategoriesNames);

        return (
            <div className="expense">
                <Form inline className="expense-form" onSubmit={this.onSubmit}>
                    <Form.Group as={Col} controlId="formGridValue" className="expense-form-group">
                        <Form.Label>Сумма</Form.Label>
                        <Form.Control required type="numeric" placeholder="0.00" value={value} onChange={this.onValueChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCategory" className="expense-form-group">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control as="select" defaultValue="Выберите категорию" required type="string" value={categoryName} onChange={this.onCategoryChange}>
                            <option value={""}>Выберите категорию</option>
                            {
                                categoriesNames && categoriesNames
                                    .map((value, i) => <option key={i} value={value}>{value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSubcategory" className="expense-form-group">
                        <Form.Label>Подкатегория</Form.Label>
                        <Form.Control as="select" defaultValue="Выберите подкатегорию" value={subcategoryName} onChange={this.onSubcategoryChange}>
                            <option value={""}>Выберите подкатегорию</option>
                            {
                                subCategoriesNames && subCategoriesNames
                                    .map((value, i) => <option key={i} value={value}>{value}</option>)
                            }

                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate" className="expense-form-group">
                        <Form.Label>Дата</Form.Label>
                        <Form.Control required type="date" max={new Date().toISOString().split("T")[0]} value={date} onChange={this.onDateChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridButton" className="expense-form-group">
                        <Button
                            variant="primary"
                            type="submit"
                            className="btn-expense-form-group">
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(operationsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);