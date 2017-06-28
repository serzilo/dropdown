import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/dropdownActions';


import './app.css';

import Dropdown from '../Dropdown';

class App extends Component {
    render() {
        const {
            actions,
            results
        } = this.props;

        return (
            <div>
                <h1>Hello!</h1><h1>Hello!</h1><h1>Hello!</h1><h1>Hello!</h1><h1>Hello!</h1>
                <h1>Hello!</h1><h1>Hello!</h1><h1>Hello!</h1><h1>Hello!</h1><h1>Hello!</h1>
                <Dropdown actions={actions} results={results} label="Выберите страну" />
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        results: state.dropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
