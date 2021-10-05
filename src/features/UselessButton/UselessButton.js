import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as uselessButtonActions from './redux';

class UselessButton extends Component {
    static propTypes = {
        currentCount: PropTypes.number,
    }

    render() {
        const { currentCount, count } = this.props;

        return (
            <div>
                <p>
                    Current count: {currentCount}
                </p>
                <Button onClick={count}>Increase</Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentCount: state.uselessButton.currentCount,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(uselessButtonActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UselessButton);