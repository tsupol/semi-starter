import React, {PropTypes} from 'react';
import {HOC} from 'formsy-react';
import SemiInputComponent from './SemiInputComponent';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import helper from '../../libs/helper'

class SemiCheckInput extends SemiInputComponent {

    shouldComponentUpdate(nextProps) {
        let isEqual = false;
        if(this.checkUpdateValue !== undefined) {
            //isEqual = helper.isArrayEqual(this.checkUpdateValue, nextProps.getValue());
            isEqual = this.checkUpdateValue == nextProps.getValue();
        }
        if(!isEqual) {
            // Note: must clone array!
            this.checkUpdateValue = nextProps.getValue().slice(0);
            return true;
        }
        return false;
    }

    controlledValue = (props = this.props) => {
        let value = (props.value || props.defaultValue);
        let valueIsObject = typeof value == 'object';
        // todo: Please do not use shorthand if for " COMPLEX " conditional statement. Always make code simple.
        let defaultValue = props.multiple ? (valueIsObject ? value.map((i)=>parseInt(i, 10)) : (value ? [parseInt(value, 10)] : props.required ? '' : [])) : (valueIsObject ? parseInt(value[0], 10) : (value ? parseInt(value, 10) : props.required ? '' : null));
        return defaultValue;
    };

    handleCheck(item, index) {
        let currentValue = this.props.getValue();
        //let id = parseInt(item.id, 10);
        if (!currentValue) currentValue = this.props.multiple ? [] : null;
        if (this.props.multiple) {
            const index = currentValue.indexOf(item.id);
            if (index < 0) {
                currentValue.push(item.id);
                this.props.onCheck && this.props.onCheck(currentValue, index);
            } else {
                currentValue.splice(index, 1);
                this.props.onCheck && this.props.onCheck(currentValue, index);
            }
        } else {
            currentValue = item.id;
            this.props.onCheck && this.props.onCheck(currentValue);
        }
        if (typeof currentValue == 'object' && this.props.required && currentValue.length == 0 || currentValue == null) currentValue = '';
        this.props.setValue(currentValue);
    }

    render() {
        //console.log('render: SemiTextField', this.props.validations);
        let {
            getErrorMessage,
            getErrorMessages,
            getValue,
            hasValue,
            isFormDisabled,
            isFormSubmitted,
            isPristine,
            setValue,
            isRequired,
            isValid,
            isValidValue,
            resetValue,
            showError,
            showRequired,

            floatingLabelFixed,
            labelPosition,
            children,
            value,
            options,
            multiple,
            type,
            validations,
            validationErrors,
            ...rest
            } = this.props;



        let currentValue = this.props.getValue();

        // --- Icon Buttons
        let clearIcon = null;
        let minusWidth = 0;
        if (currentValue && currentValue.length !== 0 && !this.props.disabled && this.props.showClearButton) {
            clearIcon = (
                <IconButton className="btn-icon" onTouchTap={this.handleClear.bind(this)}>
                    <ClearIcon/>
                </IconButton>
            );
            minusWidth += 36;
        }

        if (!children && items) children = items;
        if (!currentValue) currentValue = multiple ? [] : null;
        let valueIsObject = typeof currentValue == 'object' && currentValue !== null;

        // generating checkbox/radio

        let items = options ? [] : null;
        if (typeof options === 'object') { // object or array only
            for (let i in options) {
                let option = options[i];
                let id = option.id || i.toString();
                let color = option.color || null;
                let checked = (valueIsObject ? currentValue.indexOf(id) !== -1 : currentValue == id);
                let iconStyle = color ? {fill: color} : {};
                let labelStyle = color ? {color: color} : {};
                items.push(
                    <Checkbox
                        key={i}
                        checkedIcon={multiple ? null : <RadioButtonChecked />}
                        uncheckedIcon={multiple ? null : <RadioButtonUnchecked />}
                        onCheck={this.handleCheck.bind(this, option, i)}
                        label={option.name}
                        checked={checked}
                        iconStyle={iconStyle}
                        labelStyle={labelStyle}
                        />);

            }
        }

        let width = (this.props.fullWidth ? `calc(100% - ${minusWidth}px)` : `auto`);

        return (
            <div>
                <div style={{width}}>
                    {items}
                </div>
                <div style={{display: 'inline-block', verticalAlign: 'bottom', paddingBottom: '8px'}}>
                    {clearIcon}
                </div>
            </div>
        );
    }
}

export default HOC(SemiCheckInput);