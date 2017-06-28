import React, { Component }  from 'react';
import PropTypes from 'prop-types';

export default class DropdownItem extends Component {
    clickHandler() {
        this.props.onClick(this.props.item);
    }

    highlightText(name) {
        let highLightedText = name;

        if (this.props.query) {
            const re = new RegExp("^"+this.props.query, 'gi');

            highLightedText = highLightedText.replace(re, function(str) {
                return `<span class="dropdown__suggest-item-highlighted">${str}</span>`;
            });
        }

        return {__html: highLightedText};
    }

    render() {
        const {
            item,
            isTouch
        } = this.props;

        return (
                isTouch === true? (
                     <option
                         value={item.name}
                     >{item.name}</option>
                ) : (
                    <div
                        className="dropdown__suggest-item"
                        onClick={() => this.clickHandler()}
                        dangerouslySetInnerHTML={this.highlightText(item.name)}
                    >
                    </div>
                )
        );
    }
}

DropdownItem.propTypes = {
    item: PropTypes.object.isRequired,
    query: PropTypes.string,
    isTouch: PropTypes.bool,
    onClick: PropTypes.func
};
