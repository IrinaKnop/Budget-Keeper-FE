import React, {Component} from "react";
import {Button, Col, Form, Modal,} from "react-bootstrap";
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
                    userId: PropTypes.number,
                    name: PropTypes.string,
                    uselessType: PropTypes.bool,
                    incomeLabel: PropTypes.bool,
                    listSubcategories: PropTypes.array
                })),
            }
        ),
        listPayments: PropTypes.arrayOf(PropTypes.shape({
                userId: PropTypes.number,
                incomeLabel: PropTypes.bool,
                date: PropTypes.array,
                categoryName: PropTypes.string,
                subcategoryName: PropTypes.string,
                value: PropTypes.number,
            }
        )),
        newCategory: PropTypes.object,
        newSubcategory: PropTypes.object,
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
            incomeLabel: true,
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
        const category = this.props.listCategories.incomeList
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

    onSubcategoryChange = (event) => {
        if (event.target.value === "Добавить подкатегорию") {
            this.setState({showAddSubcategory: true})
            if (this.props.newSubcategory) {
                this.setState({subcategoryName: this.props.newSubcategory.name});
            }
        } else {
            this.setState({subcategoryName: event.target.value});
        }
    }

    onAddingSubcategoryChange = (event) => {
        const subcategory = this.props.listCategories?.incomeList
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

        this.props.addNewPayment({
            incomeLabel,
            date,
            categoryName,
            subcategoryName,
            value
        });

        this.props.getCategories();

        this.setState({
            date: "",
            categoryName: "",
            subcategoryName: "",
            value: "",
        });
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
            addingCategoryName:"",
            showAddCategory: false,
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
            addingSubcategoryName:"",
            showAddSubcategory: false,
        });
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const {isAddedPayment} = this.props;
    //     if (isAddedPayment) {
    //         this.props.getAllPayments();
    //     }
    // }

    render() {
        const {
            date, categoryName, subcategoryName, value,
            showAddCategory, addingCategoryName, addingCategoryErrorMessage,
            showAddSubcategory, addingSubcategoryName, addingSubcategoryErrorMessage
        } = this.state;
        const categoriesNames = this.props.listCategories?.incomeList
            .map(category => category.name);

        const subCategoriesNames = this.props.listCategories?.incomeList
            .filter(subcategory => subcategory.name === categoryName)
            .flatMap(subcategory => subcategory.listSubcategories)
            .map(subCategory => subCategory.name);

        const newCategory = this.props.newCategory;
        const newSubcategory = this.props.newSubcategory;

        return (
            <div className="income">
                <Form inline className="income-form" onSubmit={this.onSubmit}>
                    <Form.Group as={Col} controlId="formGridValue" className="income-form-group">
                        <Form.Label>Сумма</Form.Label>
                        <Form.Control required type="numeric" placeholder="0.00" value={value}
                                      onChange={this.onValueChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCategory" className="income-form-group">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control as="select" defaultValue="Выберите категорию" required type="string"
                                      value={categoryName} onChange={this.onCategoryChange}>
                            <option value={""}>Выберите категорию</option>
                            {
                                categoriesNames && categoriesNames
                                    .map((value, i) => <option key={i} value={value}>{value}</option>)
                            }
                            {
                                newCategory && (
                                    <option value={newCategory.name}>{newCategory.name}</option>
                                )
                            }
                            <option>Добавить категорию</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSubcategory" className="income-form-group">
                        <Form.Label>Подкатегория</Form.Label>
                        <Form.Control as="select" defaultValue="Выберите подкатегорию" value={subcategoryName}
                                      onChange={this.onSubcategoryChange}>
                            <option value={""}>Выберите подкатегорию</option>
                            {
                                subCategoriesNames && subCategoriesNames
                                    .map((value, i) => <option key={i} value={value}>{value}</option>)
                            }
                            {
                                newSubcategory && (
                                    <option value={newSubcategory.name}>{newSubcategory.name}</option>
                                )
                            }
                            {
                                (categoryName != null && categoryName !== "") && (
                                    <option>Добавить подкатегорию</option>
                                )
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate" className="income-form-group">
                        <Form.Label>Дата</Form.Label>
                        <Form.Control required type="date" max={new Date().toISOString().split("T")[0]} value={date}
                                      onChange={this.onDateChange}/>
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
                <Modal show={showAddCategory} onHide={this.handleCloseAddCategory} centered>
                    <Form onSubmit={this.onSubmitCategoryForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавить категорию</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Название категории</Form.Label>
                                <Form.Control
                                    required type="string"
                                    placeholder="Введите название категории"
                                    value={addingCategoryName}
                                    onChange={this.onAddingCategoryChange}
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
                            <Form.Group>
                                <Form.Label>Название подкатегории</Form.Label>
                                <Form.Control
                                    required type="string"
                                    placeholder="Введите название подкатегории"
                                    value={addingSubcategoryName}
                                    onChange={this.onAddingSubcategoryChange}
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
        newCategory: state.payments.newCategory,
        newSubcategory: state.payments.newSubcategory,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(operationsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIncome);