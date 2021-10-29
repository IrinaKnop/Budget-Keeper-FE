import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, Form, Modal} from "react-bootstrap";
import './AddExpense.css';
import {bindActionCreators} from "redux";
import * as operationsActions from "../redux";
import {connect} from "react-redux";

class AddExpense extends Component {
    static propTypes = {
        listCategories: PropTypes.shape(
            {
                expensesList: PropTypes.arrayOf(PropTypes.shape({
                    userid: PropTypes.number,
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
        addNewCategory: PropTypes.func,
        addNewSubcategory: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            showAddCategory: false,
            showAddSubcategory: false,
            addingCategoryName: null,
            addingSubcategoryName: null,
            incomeLabel: false,
            uselessType: false,
            listSubcategories: [],
            date: null,
            categoryName: null,
            subcategoryName: null,
            value: null,
            addingErrorMessage: null,
            addingCategoryErrorMessage: null,
            addingSubcategoryErrorMessage: null,
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    handleCloseAddCategory = () => {
        this.setState({showAddCategory: false});
    }

    handleCloseAddSubcategory = () => {
        this.setState({showAddSubcategory: false});
    }

    onValueChange = (event) => {
        this.setState({value: event.target.value});
    }

    onCategoryChange = (event) => {
        if (event.target.value === "Добавить категорию") {
            this.setState({showAddCategory: true});
            if (this.props.newCategory) {
                this.setState({categoryName: this.props.newCategory.name});
            }
        } else {
            this.setState({categoryName: event.target.value});
        }
    }

    onAddingCategoryChange = (event) => {
        const category = this.props.listCategories.expensesList
            .filter(category => category.name.toLowerCase() === event.target.value.toLowerCase())
            .map(category => category.name.toLowerCase());
        if (category.length != 0) {
            if ((category[0] === event.target.value.toLowerCase())) {
                return this.setState({addingCategoryErrorMessage: "Такая категория уже существует"});
            }
        } else {
            return this.setState({addingCategoryName: event.target.value})
        }
    }

    onUselessTypeCategoryChange = (event) => {
        this.setState({uselessType: !this.state.uselessType});
        console.log(this.state.uselessType)
    }

    onSubcategoryChange = (event) => {
        if (event.target.value === "Добавить подкатегорию") {
            this.setState({showAddSubcategory: true});
            if (this.props.newSubcategory) {
                this.setState({subcategoryName: this.props.newSubcategory.name});
            }
        } else {
            this.setState({subcategoryName: event.target.value});
        }
    }

    onUselessTypeSubcategoryChange = (event) => {
        this.setState({uselessType: !this.state.uselessType});
        console.log(this.state.uselessType)

    }

    onAddingSubcategoryChange = (event) => {
        const subcategory = this.props.listCategories?.expensesList
            .flatMap(category => category.listSubcategories)
            .filter(subCategory => subCategory.name.toLowerCase() === event.target.value.toLowerCase())
            .map(subCategory => subCategory.name.toLowerCase());
        if (subcategory.length != 0) {
            console.log(subcategory)
            if ((subcategory[0] === event.target.value.toLowerCase())) {
                return this.setState({addingSubcategoryErrorMessage: "Такая подкатегория уже существует"});
            }
        } else {
            return this.setState({addingSubcategoryName: event.target.value})
        }
    }

    onDateChange = (event) => {
        this.setState({date: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {incomeLabel, date, categoryName, subcategoryName, value} = this.state;
        console.log(this.state);

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
            addingCategoryName:"",
            addingSubcategoryName:"",
        });

        this.props.getCategories();
    }

    onSubmitCategoryForm = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {addingCategoryName} = this.state;
        let categoryFormat;
        if (addingCategoryName.length > 1) {
            categoryFormat = addingCategoryName.substring(0, 1).toUpperCase() + addingCategoryName.substring(1).toLowerCase();
            this.setState({addingCategoryName: categoryFormat});
            this.setState({addingCategoryErrorMessage: null});
        } else {
            this.setState({addingCategoryErrorMessage: "Слишком короткое название"});
        }

        const {uselessType, incomeLabel, listSubcategories} = this.state;
        console.log(categoryFormat, uselessType, incomeLabel);
        this.props.addNewCategory({
            name: categoryFormat,
            uselessType,
            incomeLabel,
            listSubcategories
        });
        this.setState({
            categoryName: categoryFormat,
            showAddCategory: false,
            uselessType: false,
        });
    }

    onSubmitSubcategoryForm = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {addingSubcategoryName} = this.state;
        let subcategoryFormat;
        if (addingSubcategoryName.length > 1) {
            subcategoryFormat = addingSubcategoryName.substring(0, 1).toUpperCase() + addingSubcategoryName.substring(1).toLowerCase();
            this.setState({addingSubcategoryName: subcategoryFormat});
            this.setState({addingSubcategoryErrorMessage: null});
        } else {
            this.setState({addingSubcategoryErrorMessage: "Слишком короткое название"});
        }

        const {categoryName, uselessType, incomeLabel} = this.state;
        console.log(subcategoryFormat, uselessType, incomeLabel);

        this.props.addNewSubcategory({
            categoryName,
            name: subcategoryFormat,
            uselessType,
            incomeLabel
        });

        this.setState({
            subcategoryName: subcategoryFormat,
            showAddSubcategory: false,
            uselessType: false,
        });
    }

    render() {

        const {
            date, categoryName, subcategoryName, value, uselessType,
            showAddCategory, addingCategoryName, addingCategoryErrorMessage,
            showAddSubcategory, addingSubcategoryName, addingSubcategoryErrorMessage,
        } = this.state;
        const categoriesNames = this.props.listCategories?.expensesList
            .map(category => category.name);

        const subCategoriesNames = this.props.listCategories?.expensesList
            .filter(category => category.name === categoryName)
            .flatMap(category => category.listSubcategories)
            .map(subCategory => subCategory.name);

        return (
            <div className="expense">
                <Form inline className="expense-form" onSubmit={this.onSubmit}>
                    <Form.Group as={Col} controlId="formGridValue" className="expense-form-group">
                        <Form.Label>Сумма</Form.Label>
                        <Form.Control required type="numeric" placeholder="0.00" value={value}
                                      onChange={this.onValueChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCategory" className="expense-form-group">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control as="select" defaultValue="Выберите категорию" required type="string" value={categoryName} onChange={this.onCategoryChange}>
                            <option value={""}>Выберите категорию</option>
                            {
                                categoriesNames && categoriesNames
                                    .map((value, i) => <option key={i} value={value}>{value}</option>)
                            }
                            {
                                addingCategoryName && (
                                    <option value={addingCategoryName}>{addingCategoryName}</option>
                                )
                            }
                            <option>Добавить категорию</option>
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
                            {
                                addingSubcategoryName && categoryName != null && categoryName !== "" &&(
                                    <option value={addingSubcategoryName}>{addingSubcategoryName}</option>
                                )
                            }
                            {
                                (categoryName != null && categoryName !== "") && (
                                    <option>Добавить подкатегорию</option>
                                )
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
                <Modal show={showAddCategory} onHide={this.handleCloseAddCategory} centered>
                    <Form onSubmit={this.onSubmitCategoryForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавить категорию</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Название категории</Form.Label>
                                <Form.Control
                                    required type="string"
                                    placeholder="Введите название категории"
                                    value={addingCategoryName}
                                    onChange={this.onAddingCategoryChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label='Эти расходы можно отнести к "бесполезным"'
                                    checked={uselessType}
                                    onChange={this.onUselessTypeCategoryChange}
                                />
                            </Form.Group>
                            {
                                addingCategoryErrorMessage && (
                                    <p className="registration-error-message">
                                        Ошибка: {addingCategoryErrorMessage}
                                    </p>
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseAddCategory}>
                                Закрыть
                            </Button>
                            <Button variant="primary" type="submit">
                                Добавить
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Modal show={showAddSubcategory} onHide={this.handleCloseAddSubcategory} centered>
                    <Form onSubmit={this.onSubmitSubcategoryForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавить подкатегорию</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Название подкатегории</Form.Label>
                                <Form.Control
                                    required type="string"
                                    placeholder="Введите название подкатегории"
                                    value={addingSubcategoryName}
                                    onChange={this.onAddingSubcategoryChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label='Эти расходы можно отнести к "бесполезным"'
                                    checked={uselessType}
                                    onChange={this.onUselessTypeSubcategoryChange}
                                />
                            </Form.Group>
                            {
                                addingSubcategoryErrorMessage && (
                                    <p className="registration-error-message">
                                        Ошибка: {addingSubcategoryErrorMessage}
                                    </p>
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseAddSubcategory}>
                                Закрыть
                            </Button>
                            <Button variant="primary" type="submit">
                                Добавить
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);