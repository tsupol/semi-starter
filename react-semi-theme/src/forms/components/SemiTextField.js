import React, { PropTypes } from 'react';
import {HOC} from 'formsy-react';
import SemiInputComponent from './SemiInputComponent';
import TextField from 'material-ui/TextField';
import ErrorMessage from '../../forms/ErrorMessage';
import IconButton from 'material-ui/IconButton/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import VisibleOffIcon from 'material-ui/svg-icons/action/visibility-off';
import validator from 'validator';

class SemiTextField extends SemiInputComponent{
    shouldComponentUpdate(nextProps) {
        if(this.checkUpdateValue != nextProps.getValue()) {
            this.checkUpdateValue = nextProps.getValue();
            return true;
        }
        return false;
    }
    handleChange = (event) => {
        let value = event.currentTarget.value;
        if(this.props.type && this.props.type.match(/numeric/gi) && value&&!validator.isNumeric(value)){
            value = this.props.getValue();
        }
        this.props.setValue(value);
        this.props.onChange&&this.props.onChange(value, event);
    };
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
            value,
            type,
            validations,
            validationErrors,
            prependIcon,
            appendButton,
            setValidations,
            maxWidth,
            calculatedWidth,
            showClearButton,
            validationError,
            grid,
            ...rest
        } = this.props;

        let currentValue = this.props.getValue();

        // --- Icon Buttons
        let clearIcon = null;
        let minusWidth = 0;
        if (currentValue && currentValue.length !== 0 && !this.props.disabled && this.props.showClearButton) {
            clearIcon = (
                <IconButton className="btn-icon" onTouchTap={this.handleClear.bind(this)} style={{verticalAlign: 'middle', marginTop: '18px'}}>
                    <ClearIcon/>
                </IconButton>
            );
            minusWidth += 36;
        }
        let passwordIcon = null;
        if (type === 'password') {
            passwordIcon = (
                <IconButton className="btn-icon" disabled style={{display: this.props.type=='password' ? 'inline-block' : 'none', verticalAlign: 'middle'}}>
                    <VisibleOffIcon/>
                </IconButton>
            );
            minusWidth += 36;
        }
        if (type&&type.match(/numeric/gi)) {
            validations['isNumeric'] = true;
            validationErrors['isNumeric'] = 'Accept only number!';
        }
        if(prependIcon){
            let iconStyle = Object.assign({
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: 10,
                width: 50,
                height: 50
            }, prependIcon.props.style);
            prependIcon = React.cloneElement(prependIcon, {
                style: iconStyle
            });
            minusWidth += iconStyle.width + iconStyle.marginRight;
        }
        if(appendButton){
            appendButton = React.cloneElement(appendButton, {
                style: {
                    display: 'inline-block',
                    width: '200px',
                    marginLeft: '10px',
                    verticalAlign: 'middle'
                }
            });
            minusWidth += 210;
        }
        let width = (this.props.fullWidth ? `calc(100% - ${minusWidth}px)` : `auto`);

        let customTextField = React.cloneElement(
            <TextField
                {...rest}
                type={type||'text'}
                ref='input'
                inputStyle={{cursor: this.props.disabled ? 'not-allowed' : null}}
                style={{width: width, verticalAlign: 'middle'}}
                errorText={this.props.getErrorMessage()}
                onBlur={this.handleBlur}
                onChange={this.handleChange.bind(this)}
                value={currentValue}/>
        );

        if(customTextField._owner._instance.refs.input && this.props.inputAttrs){
            for(let i in this.props.inputAttrs){
                customTextField._owner._instance.refs.input.input.setAttribute(i, this.props.inputAttrs[i]);
            }
        }

        return (
            <div>
                {prependIcon}
                {customTextField}
                {clearIcon}
                {passwordIcon}
                {appendButton}
            </div>
        );
    }
}

export default HOC(SemiTextField);