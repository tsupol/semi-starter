import React, {PropTypes, Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Form} from 'formsy-react';
import ReactDOM from 'react-dom';
import Loading from '../widgets/Loading';
import ErrorMessage from './ErrorMessage';
import SemiTextField from './components/SemiTextField';
import SemiSelectField from './components/SemiSelectField';
import SemiDatePicker from './components/SemiDatePicker';
import SemiColorPicker from './components/SemiColorPicker';
import SemiSliderInput from './components/SemiSliderInput';
import SemiToggleInput from './components/SemiToggleInput';
import SemiCheckInput from './components/SemiCheckInput';
import SemiAutoComplete from './components/SemiAutoComplete';
import SemiSelectTextField from './components/SemiSelectTextField';
import UploadBox from './components/UploadBox';
import helper from './../libs/helper';
// import {Grid, Row, Col} from 'react-flexbox-grid';

const breakpoints = {
	xs: '(min-width: 0)',
	sm: '(min-width: 576px)',
	md: '(min-width: 768px)',
	lg: '(min-width: 992px)',
	xl: '(min-width: 1200px)'
};

class SemiForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			canSubmit: false,
			ready: props.onLoad ? false : true, // for loading spinner
			// for formTemplate
			values: props.formTemplate.values ? props.formTemplate.values : {},
			data: props.formTemplate.data ? props.formTemplate.data : {}
		};
	}

	componentWillReceiveProps(nextProps) {
		// for formTemplate
		this.setState({
			values: nextProps.formTemplate.values ? nextProps.formTemplate.values : {},
			data: nextProps.formTemplate.data ? nextProps.formTemplate.data : {}
		});
	}

	componentDidMount() {
		// Show loading when fetching server data
		// Prevent the form from rendering when not having enough data (important!)
		if (this.props.onLoad) {
			this.props.onLoad(this.context.ajax).then((/*data*/) => {
				this.setState({ready: true})
			});
		}
	}

	// Formsy's
	enableButton = () => {
		if (this.state.canSubmit === true) return;
		this.setState({
			canSubmit: true
		});
	};

	// Formsy's
	disableButton = () => {
		if (this.state.canSubmit === false) return;
		this.setState({
			canSubmit: false
		});
	};

	/**
	 * Private: Handle submit
	 */
	onFormSubmit = (data, error, event) => {
		if (this.props.onSubmit) {
			console.log('this.context.ajax', this.context.ajax);
			let promise = this.props.onSubmit(data, this.context.ajax);
			if (promise) {
				return promise.then(response => {
					// todo: submit loading here...
				}).catch(error => {
					// I find it better not forcing alert on error.
					// this.context.dialog.alert(error, 'Error!');
				});
			}
		}
	};

	// From Formsy. Do nothing for now.
	notifyFormError = (data) => {};

	/**
	 * Public: To submit `SemiForm` using ref
	 */
	submit = () => {
		ReactDOM.findDOMNode(this.refs.submitBtn).click();
	};

	/**
	 * Public: Reset form to original state (not clear everything)
	 */
	resetForm = () => {
		this.refs.form.reset();
	};

	handleFormChange = (currentValues, isChanged) => {
		if(this.props.onChange) this.props.onChange(currentValues, isChanged);
	};

	// todo: add manual width
	calculateColumnWidth = (row) => {
		let hiddenCount = 0;
		for (let itemId in row) {
			if (row[itemId].type == 'hidden') hiddenCount++;
		}
		// Auto
		for (let itemId in row) {
			let item =row[itemId];
			let md = helper.get(item, 'grid.md');
			if(md) { // have manual width
				item.calculatedWidth = md;
			} else {
				item.calculatedWidth = Math.floor(100 / (row.length - hiddenCount)) + '%';
			}
		}
	};

	// registerWindowResize = () => {
	// 	var timeout = false, // holder for timeout id
	// 		delay = 250; // delay after event is "complete" to run callback
	// 	// window.resize event listener
	//	
	// 	window.addEventListener('resize', () => {
	// 		// clear the timeout
	// 		clearTimeout(timeout);
	// 		// start timing for event "completion"
	// 		timeout = setTimeout(()=> {
	// 			this.calculateColumnWidth();
	// 		}, delay);
	// 	});
	// };

	render() {
		// console.log('render: form', this.state.ready);
		let props = this.props;
		let {children, formTemplate, extraButtons, isFilterForm, ...rest} = props;

		let settings = Object.assign({}, {
			// Default
			// todo: remove this
			// buttonRight: true,
			buttonAlign: 'right',
			noButton: false,
			noSubmitButton: false,
			hasReset: false,
			compact: false,
			isFilterForm: false,
			submitLabel: 'Submit'
		}, rest, {
			// Override
			eventRender: this.eventRender,
			dayClick: this.dayClick,
			loading: this.loading
		});

		/**
		 *
		 * Form Generator Section ------------------
		 *
		 */

		let components = [];
		if (formTemplate) {
			let values = this.state.values,
				data = this.state.data,
				validators = formTemplate.validators,
				formSettings = formTemplate.settings;

			if (validators) {
				// todo: form validation is to be shared by multiple components in the form
			}

			for (let rowId in formTemplate.components) {

				let row = formTemplate.components[rowId];
				let templateSettings = {};
				// console.log('row', row);

				// Row must be array of objects
				// Except for row with setting
				if (!Array.isArray(row)) {
					templateSettings = row.settings;
					row = row.items;
				}

				// process row settings here...
				if (templateSettings && templateSettings.hide) continue;

				// todo: calculate column width here...
				let cols = [];
				// let hiddenCount = 0;
				// for (let itemId in row) {
				// 	let item = row[itemId];
				// 	if (row[itemId].type == 'hidden') hiddenCount++;
				// }
				// // let md = Math.floor(12 / (row.length - hiddenCount)); // equally width for now
				//
				// for (let itemId in row) {
				// 	row[itemId].calculatedWidth = Math.floor(100 / (row.length - hiddenCount)) + '%'; // equally width for now
				// }
				this.calculateColumnWidth(row);

				// loop create items
				for (let itemId in row) {

					let item = row[itemId],
						component = null,
						{name} = item;
					let value = item.type == 'string' ? item.value : values[name];

					let defaultValues = {
						required: false,
						disabled: false,
						fullWidth: true
					};

					let vs = item.validations,
						validations = {},
						validationErrors = {};
					if (vs) {
						if (typeof vs === 'string') {
							let params = vs.split(':');
							if (params.length === 1) {
								validations[vs] = true;
								if (ErrorMessage[vs]) validationErrors[vs] = ErrorMessage[vs];
							} else if (params.length === 2) {
								validations[params[0]] = params[1];
								if (ErrorMessage[params[0]]) validationErrors[params[0]] = ErrorMessage[params[0]];
							}
						}
						// todo if not string
					}

					// console.log('validations', validations, validationErrors);
					let overrideValues = { // props with different names or need processing
						floatingLabelText: item.label, // todo: * and optional
						hintText: item.hint ? item.hint : '',
						value,
						validations,
						validationErrors
					};

					let {type, element, ...rest} = Object.assign(defaultValues, item, overrideValues);

					// Set default visibility of X (clear button)
					let showClearButton = true; // default
					if (formSettings && formSettings.showClearButton !== undefined) showClearButton = formSettings.showClearButton; // override default
					if (rest.showClearButton !== undefined) showClearButton = rest.showClearButton; // override all
					rest.showClearButton = showClearButton;

					switch (type) {
						case 'custom':
							component = element;
							break;
						case 'text':
							component = (
								<SemiTextField
									{...rest}
									/>
							);
							break;
						case 'select+text':
							component = (
								<SemiSelectTextField
									{...rest}
									/>
							);
							break;
						case 'password':
							component = (
								<SemiTextField
									{...rest} type="password"
									/>
							);
							break;
						case 'string':
							component = (
								<div className="form-string" {...rest}>{value}</div>
							);
							break;
						case 'numeric':
							component = (
								<SemiTextField
									{...rest} type="numeric"
									/>
							);
							break;
						case 'hidden':
							component = (
								<div style={{display: 'none'}}>
									<SemiTextField
										{...rest} type="hidden"
										/>
								</div>
							);
							break;
						case 'select':
							component = (
								<SemiSelectField
									options={data[name]}
									{...rest}
									/>
							);
							break;
						case 'multiselect':
							component = (
								<SemiSelectField
									options={data[name]}
									multiple={true}
									{...rest}
									/>
							);
							break;
						case 'empty':
							component = (null);
							break;
						case 'color':
							component = (
								<SemiColorPicker
									{...rest}
									/>
							);
							break;
						case 'date':
							component = (
								<SemiDatePicker
									{...rest}
									/>
							);
							break;
						case 'checkbox':
							component = (
								<SemiCheckInput
									multiple={true}
									{...rest}
									/>
							);
							break;
						case 'radio':
							component = (
								<SemiCheckInput
									{...rest}
									/>
							);
							break;
						case 'slider':
							component = (
								<SemiSliderInput
									{...rest}
									/>
							);
							break;
						case 'toggle':
							component = (
								<SemiToggleInput
									{...rest}
									/>
							);
							break;
						case 'autocomplete':
							component = (
								<SemiAutoComplete
									{...rest}
									/>
							);
							break;
						case 'typeahead':
							component = (
								<SemiAutoComplete
									typeahead={true}
									{...rest}
									/>
							);
							break;
						case 'uploadbox':
							component = (
								<UploadBox
									{...rest}
									/>
							);
							break;
					}
					// cols.push(<Col key={itemId} xs md={md}>{component}</Col>);
					// console.log('item', item);
					cols.push(<div key={itemId} style={{width: item.calculatedWidth, maxWidth: item.maxWidth}} className="sf-col">{component}</div>);
				} // item
				let rowComponent = (<div key={rowId} className="sf-row">{cols}</div>);
				components.push(rowComponent);
			} // row
		}

		/**
		 *
		 * End Form Generator Section ------------------
		 *
		 */

		let resetBtn = settings.hasReset && !settings.noButton ? (
			<RaisedButton
				label="Reset"
				style={{marginTop: 24, marginLeft: 24}}
				onClick={this.resetForm}
				/>
		) : null;

		let submitBtn = settings.noSubmitButton || settings.noButton ? null : (
			<RaisedButton
				formNoValidate
				primary={settings.isFilterForm}
				secondary={!settings.isFilterForm}
				style={{marginTop: 24}}
				type="submit"
				label={settings.submitLabel}
				disabled={!this.state.canSubmit}
				/>);

		// Why cloneElement?
		extraButtons = extraButtons && extraButtons.length && extraButtons.map((btn, key)=>React.cloneElement(btn, {key}));
		let buttonsAlign = settings.buttonAlign;
		let buttons = <div className="btn-wrap" style={{textAlign: buttonsAlign}}>{submitBtn} {resetBtn} {extraButtons}</div>;
		// let buttons = settings.buttonRight ?
		// 	<div className="btn-wrap" style={{textAlign: buttonsAlign}}>{resetBtn} {submitBtn} {extraButtons}</div> :
		// 	<div className="btn-wrap" style={{textAlign: buttonsAlign}}>{submitBtn} {resetBtn} {extraButtons}</div>;

		// SemiForm classes for controlling with CSS (Inline style is a pain!)
		let formClass = 'sf-wrap';
		// if (settings.buttonRight) formClass += ' btn-right';
		if (settings.compact) formClass += ' compact';
		if (settings.isFilterForm) formClass += ' filter-form';

		let formItems = (this.state.ready) ?
			(formTemplate) ? components : children : <Loading inline/>;

		let {buttonAlign, ...formParams} = rest;

		return (
			<Form
				className={`${formClass}`}
				onSubmit={this.onFormSubmit}
				onInvalid={this.disableButton}
				onValid={this.enableButton}
				onInvalidSubmit={this.notifyFormError}
				onChange={this.handleFormChange}
				ref="form"
				{...formParams}
				>
				{formItems}
				{buttons}
				<button style={{display:'none'}} ref="submitBtn" type="submit">Submit</button>
			</Form>);
	}
}

SemiForm.propTypes = {
	/**
	 * Shows reset buttons
	 * Reset is not clear everything but resetting to it's original state
	 */
	hasReset: PropTypes.bool,
	/**
	 * Usually used for fetching data from server. Only fired when SemiForm is `Mounted`.
	 * Must return a promise (by using it's `ajax` parameter).
	 *
	 * @param {promise} ajax Used to call `getAll`
	 */
	onLoad: PropTypes.func,
	/**
	 * Better form generation, less code,
	 * and prevent you from having to change every files when a component is change
	 */
	formTemplate: PropTypes.object,
	/**
	 * Default to `Submit`
	 */
	submitLabel: PropTypes.string,
	/** @ignore */
	enableButton: PropTypes.func,
	/** @ignore */
	disableButton: PropTypes.func,
	/** @ignore */
	notifyFormError: PropTypes.func,
	/**
	 * If `formTemplate` is used `children` will be ignored
	 */
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),
	/**
	 * Hide only submit button
	 */
	noSubmitButton: PropTypes.bool,
	/**
	 * Hide all buttons
	 */
	noButton: PropTypes.bool
};
SemiForm.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};

export default SemiForm;