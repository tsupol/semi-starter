import React, {PropTypes} from 'react';
import {HOC} from 'formsy-react';
import SemiInputComponent from './SemiInputComponent';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import ErrorMessage from '../../forms/ErrorMessage';
import IconButton from 'material-ui/IconButton/IconButton';
import {ContentClear, ActionSearch} from 'material-ui/svg-icons';
import helper from '../../../libs/helper';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';

class SemiSelectField extends SemiInputComponent {
	// controlledValue = (props = this.props) => {
	//     let value = (props.value || props.defaultValue);
	//     let valueIsObject = typeof value == 'object';
	//     let defaultValue = props.multiple ? (valueIsObject ? value.map((i)=>parseInt(i, 10)) : (value ? [parseInt(value, 10)] : props.required ? '' : [])) : (valueIsObject ? parseInt(value[0], 10) : (value ? parseInt(value, 10) : props.required ? '' : null));
	//     return defaultValue;
	// };

	shouldComponentUpdate(nextProps) {
		// console.log('this.checkUpdateValue', this.checkUpdateValue, nextProps.getValue());
		// todo: fix equal value when selected and click dropdown
		// if(this.checkUpdateValue != nextProps.getValue() || (helper.isEmpty(this.checkUpdateValue) && helper.isEmpty(nextProps.getValue()))) {
		// 	this.checkUpdateValue = nextProps.getValue();
		// 	return true;
		// }
		// return false;
		return true;
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			open: false,
			anchorEl: null,
			filter: ''
		};
	}

	handleCheck(item, index) {
		let currentValue = this.props.getValue();
		if (!currentValue) currentValue = this.props.multiple ? [] : null;
		if (this.props.multiple) {
			const index = helper.has(currentValue, item.props.value);
			if (index < 0) {
				currentValue.push(helper.toInt(item.props.value, 10));
				this.props.onChange && this.props.onChange(currentValue, index);
			} else {
				currentValue.splice(index, 1);
				this.props.onChange && this.props.onChange(currentValue, index);
			}
		} else {
			currentValue = helper.toInt(item.props.value, 10);
			this.handleRequestCloseMenu();
			this.props.onChange && this.props.onChange(currentValue, index);
		}
		if (typeof currentValue == 'object' && this.props.required && currentValue.length == 0 || currentValue == null) currentValue = '';
		console.log('456', currentValue);
		this.props.setValue(currentValue);
	}

	handleTouchTap = (event) => {
		// This prevents ghost click.
		event.preventDefault();
		this.setState({
			open: true,
			anchorEl: event.currentTarget
		});
	};

	handleRequestCloseMenu = () => {
		this.setState({
			open: false
		});
	};

	handleFilterChange = (event) => {
		let value = event.target.value;
		this.setState({
			filter: value
		});
	};

	render() {
		//console.log('render: SemiTextField', this.props.validations);
		let {
			// !!! Do not delete: preserver for references
			// getErrorMessage,
			// getErrorMessages,
			// getValue,
			// hasValue,
			// isFormDisabled,
			// isFormSubmitted,
			// isPristine,
			// setValue,
			// isRequired,
			// isValid,
			// isValidValue,
			// resetValue,
			// showError,
			// showRequired,
			//
			// autoWidth,
			// style,
			// underlineDisabledStyle,
			// underlineFocusStyle,
			// underlineStyle,
			// errorStyle,
			// selectFieldRoot,
			// disabled,
			// floatingLabelText,
			// floatingLabelFixed,
			// floatingLabelStyle,
			// hintStyle,
			// hintText,
			// fullWidth,
			// errorText,
			// onFocus,
			// onBlur,
			// onChange,
			//
			// value,
			// type,
			// validations,
			// validationErrors,
			options, // options items
			children,
			...rest
		} = this.props;
		
		let settings = Object.assign({}, {
			// Text Input
			floatingLabelFixed: false,
			// Custom
			multiple: false,
			showFilter: true,
			showFilterMinimum: 7
		}, rest, {
			// Override
			eventRender: this.eventRender,
			dayClick: this.dayClick,
			loading: this.loading
		});

		let currentValue = this.props.getValue();

		// --- Icon Buttons
		let clearIcon = null;
		let minusWidth = 0;
		if (currentValue && currentValue.length !== 0 && !this.props.disabled) {
			clearIcon = (
				<IconButton className="btn-icon" onTouchTap={this.handleClear.bind(this)}>
					<ContentClear />
				</IconButton>
			);
			minusWidth += 36;
		}
		let items = options ? [] : null;
		if (typeof options === 'object') { // object or array only
			for (let i in options) {
				let id = options[i].id ? helper.toInt(options[i].id) : helper.toInt(i);
				items.push(<ListItem className="ss-option" value={id} key={id} primaryText={options[i].name}/>);
			}
		}
		let selectedItems = [];

		if (!children && items) children = items;
		if (!currentValue) currentValue = settings.multiple ? [] : null;

		let valueIsObject = typeof currentValue == 'object' && currentValue !== null;

		for (let i in children) {
			/*
			 if (valueIsObject ? currentValue.indexOf(children[i].value) >= 0 : currentValue==children[i].value) {
			 labels.push(children[i].props.primaryText);
			 }
			 */
			if (valueIsObject) {
				if (helper.has(currentValue, children[i].props.value)) {
					selectedItems.push(children[i].props.primaryText);
				}
			} else {
				if (helper.equals(currentValue, children[i].props.value)) {
					selectedItems.push(children[i].props.primaryText);
				}
			}
		}

		let checkboxItems = children ? children.filter((c)=> {
			if (this.state.filter) {
				let re = new RegExp(this.state.filter, 'gi');
				return c.props.primaryText.match(re);
			}
			return true;
		}).map((item, i) => {
			let checkbox =
				<Checkbox
					checked={valueIsObject ? helper.has(currentValue, item.props.value) : helper.equals(currentValue, item.props.value)}
					onCheck={this.handleCheck.bind(this, item, i)}/>;
			return React.cloneElement(item, {leftCheckbox: checkbox});
		}) : null;

		let width = (this.props.fullWidth ? `calc(100% - ${minusWidth}px)` : `auto`);
		let calculatedStyle = Object.assign({}, settings.style, {width});
		let calculatedValue = selectedItems.join(", ");

		return (
			<div className="ss-wrap">
				<Popover
					className="ss-popover"
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestCloseMenu}
					style={{minWidth: 250, overflowY: 'auto'}}
					animation={PopoverAnimationVertical}
					canAutoPosition={false}
				>
					{settings.showFilter && checkboxItems.length >= settings.showFilterMinimum ?
						<div className="ss-search">
							<ActionSearch className="ss-find-icon"/>
							<input type="text" onChange={this.handleFilterChange}/>
						</div>
						: null}
					<div className="ss-options-wrap">
						{checkboxItems}
					</div>
				</Popover>
				<TextField
					className="ss-text"
					ref="input"
					style={calculatedStyle}
					floatingLabelText={settings.floatingLabelText}
					floatingLabelFixed={settings.floatingLabelFixed}
					floatingLabelStyle={settings.floatingLabelStyle}
					hintStyle={settings.hintStyle}
					hintText={(!settings.hintText && !settings.floatingLabelText) ? ' ' : (selectedItems.length ? selectedItems.join(", ") : settings.hintText)}
					fullWidth={settings.fullWidth}
					errorText={settings.errorText}
					underlineStyle={settings.underlineStyle}
					errorStyle={settings.errorStyle}
					onFocus={settings.onFocus}
					onBlur={settings.onBlur}
					underlineDisabledStyle={settings.underlineDisabledStyle}
					underlineFocusStyle={settings.underlineFocusStyle}
					value={calculatedValue}
				/>
				<div className="ss-label" style={{width: width}} onTouchTap={this.handleTouchTap}>
					<div className="ss-arrow"></div>
				</div>
				{clearIcon}
			</div>
		);
	}
}

export default HOC(SemiSelectField);