import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import DropdownItem from './DropdownItem'

import './dropdown.css';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.root = null;
        this.suggestListElement = null;

        this.state = {
            query: '',
            showSuggests: false,
            inputFocused: false,
            suggestLocationBottom: true,
            isTouch: this.isTouchDevice()
        };

        this.onWindowClick = this.onWindowClick.bind(this);
    }

    componentDidUpdate() {
        this.suggestListPosition();
    }

    onInputFocus(query) {
        if (!this.state.showSuggests) {
            document.addEventListener('click', this.onWindowClick);

            // console.log('add window listener');
        }

        this.setState({showSuggests: true, inputFocused: true});

        this.showSuggests(query);
    }

    onWindowClick(event) {
        if (this.root && !this.root.contains(event.target)) {
            this.setState({ showSuggests: false });
            document.removeEventListener('click', this.onWindowClick);

            this.hideSuggests();

            // console.log('remove window listener');

            if (this.state.query === '') {
                this.setState({inputFocused: false});
            }
        }
    }

    showSuggests(query) {
        this.setState({query}, () => {
            this.props.actions.getResultsList(query);
        });
    }

    hideSuggests() {
        this.props.actions.clearResultsList();
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    };

    suggestClickHandler(item) {
        this.setState({query: item.name, showSuggests: false});
    }

    touchClickHandler(event) {
        this.setState({query: event.target.value, showSuggests: false});
    }

    suggestListPosition() {
        let listHeight = 0;
        const clientHight = document.documentElement.clientHeight;
        const rootHeight = this.root.offsetHeight;
        const rootOffsetTop = this.root.offsetTop;

        // console.log('clientHight ', clientHight);
        // console.log('rootHeight ', rootHeight);
        // console.log('rootOffsetTop ', rootOffsetTop);

        if (this.suggestListElement) {
            listHeight = this.suggestListElement.offsetHeight;
        }

        // console.log('listHeight ', listHeight);

        if ((clientHight - rootHeight - rootOffsetTop) > listHeight) {
            if (this.state.suggestLocationBottom !== true) {
                this.setState({suggestLocationBottom: true});
            }
        } else {
            if (this.state.suggestLocationBottom !== false) {
                this.setState({suggestLocationBottom: false});
            }
        }
    }

    render() {
        const {
            results,
            label
        } = this.props;

        const showSuggestList = this.state.showSuggests && results.length > 0;

        // console.log(this.props.results);
        // console.log(this.state.showSuggests);

        const rootClasses = classNames({
            'dropdown_top-suggest': ( !this.state.suggestLocationBottom ),
            'dropdown': true
        });

        const inputClasses = classNames({
            'dropdown__search-input_focused': ( this.state.inputFocused ),
            'dropdown__search-input': true
        });

        const suggestListClasses = classNames({
            'dropdown__suggest-list_bottom': ( this.state.suggestLocationBottom ),
            'dropdown__suggest-list_top': ( !this.state.suggestLocationBottom ),
            'dropdown__suggest-list': true
        });


        return (
            <div
                className={rootClasses}
                ref={(element) => { this.root = element; }}
            >

                <input
                    className={inputClasses}
                    type="text"
                    value={this.state.query}
                    onChange={(e) => this.showSuggests(e.target.value)}
                    onFocus={(e) => this.onInputFocus(e.target.value)}
                />

                {
                    label && (
                        <div className="dropdown__label">{label}</div>
                    )
                }

                {
                    this.state.isTouch ?
                        showSuggestList && (
                            <select
                                className="dropdown__suggest-list_touch"
                                onChange={(event) => this.touchClickHandler(event)}
                            >
                                {
                                    results.map((item) => {
                                        return (
                                            <DropdownItem key={item.id} isTouch={true} item={item} />
                                        );
                                    })
                                }
                            </select>
                        )
                        :
                        showSuggestList && (
                            <div
                                className={suggestListClasses}
                                ref={(element) => { this.suggestListElement = element; }}
                            >
                                {
                                    results.map((item) => {
                                        return (
                                            <DropdownItem key={item.id} item={item} query={this.state.query} onClick={(item) =>this.suggestClickHandler(item)} />
                                        );
                                    })
                                }
                            </div>
                        )
                }
            </div>
        );
    }
}

Dropdown.propTypes = {
    actions: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    label: PropTypes.string
};
