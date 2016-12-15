import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {SemiForm, FormGenerator} from 'react-semi-theme/forms';
import {SemiGrid, Row, Col} from 'react-semi-theme/grid';
import Divider from 'material-ui/Divider';

const
	optionGrid = {xs: '100%', sm: '50%', md: '25%'},
	grid2 = {xs: '100%', md: '50%'},
	grid3 = {xs: '100%', md: '33.33%'},
	grid4 = {xs: '100%', md: '25%'},
	grid5 = {xs: '100%', md: '20%'},
	uploadGrid = {xs: '100%', sm: '33.33%', md: '16.66%'},
	marginBottomStyle = {marginBottom: 24},
	imgStyle = {width: '100%'};

class MainForm extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {
	}

	handleFormChange = (data)=> {
		this.props.handleFormChange && this.props.handleFormChange(data);
	};

	submit = (data)=> {
		this.props.onSubmit && this.props.onSubmit(data);
	};

	render() {
		let showMainForm = true; // todo: you can hide main form to see sub-form more clearly

		let values = Object.assign({
			first_name: '',
			last_name: '',
			email: '',
			lineID: '',
			whatappID: '',
			phone: '',
			mobile: '',
			files: []
		}, this.props.values);
		let data = Object.assign({}, this.props.data);
		let images = this.props.images || [];

		let mainForm = {
			components: [
				[
					{type: 'custom', element: <SemiHeader size={2} style={{marginTop: 16}}>{this.context.translate('personal_information')}</SemiHeader>}
				],
				// [
				// 	{type: 'custom', element: <h3 style={{marginTop: 16}}>Personal Information</h3>}
				// ],
				[
					{type: 'text', name: 'first_name', label: this.context.translate('first_name'), grid: grid3},
					{type: 'text', name: 'last_name', label: this.context.translate('last_name'), grid: grid3},
					{type: 'text', name: 'email', label: this.context.translate('email'), grid: grid3}
				],
				[
					{type: 'numeric', name: 'phone', label: this.context.translate('phone'), grid: grid4},
					{type: 'numeric', name: 'mobile', label: this.context.translate('mobile'), grid: grid4},
					{type: 'text', name: 'lineID', label: this.context.translate('lineID'), grid: grid4},
					{type: 'text', name: 'whatappID', label: this.context.translate('whatappID'), grid: grid4}
				],
				[
					{type: 'text', name: 'country', label: this.context.translate('country')}
				],
				[
					{type: 'custom', element: <SemiHeader>{this.context.translate('medical_histories')}</SemiHeader>}
				],
				...Array.from(Array(5), (v, k) => ([
					{type: 'label', label:`${k+1}.`, grid: {
						xs: '100%', smAlign: 'right', sm: '64px'
					}},
					{type: 'text', multiLine: true, label: this.context.translate('medical_histories:what'), name: `medical_histories[${k}][what]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}},
					{type: 'text', multiLine: true, label: this.context.translate('place'), name: `medical_histories[${k}][place]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}},
					{type: 'text', multiLine: true, label: this.context.translate('doctor'), name: `medical_histories[${k}][doctor]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}},
					{type: 'text', multiLine: true, label: this.context.translate('duration'), name: `medical_histories[${k}][duration]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}}
				])),
				[
					{type: 'custom', element: <SemiHeader>{this.context.translate('medical_information')}</SemiHeader>}
				],
				[
					{type: 'text', multiLine: true, label: this.context.translate('underlying_disease'), name: 'underlying_disease', grid: grid3},
					{type: 'text', multiLine: true, label: this.context.translate('under_taking_medicine'), name: 'under_taking_medicine', grid: grid3},
					{type: 'text', multiLine: true, label: this.context.translate('drug_symptom'), name: 'drug_symptom', grid: grid3}
				],
				[
					{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>{this.context.translate('requirement')}</SemiHeader>}
				],
				[
					{type: 'text', multiLine: true, hint: this.context.translate('requirement:hint'), name: 'requirement', grid: grid2}
				],
				[
					{type: 'text', multiLine: true, label: this.context.translate('requirement:note'), name: 'note', grid: grid2}
				],
				[
					{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>{this.context.translate('upload_image')}</SemiHeader>}
				],
				[
					...images.map((image, k)=> (
					{
						type: 'uploadbox', name: `files[${k}]`, thumbnail: image.thumbnail, example: image.example, grid: uploadGrid
					}
					))
				]
				// ...components, // use this.props.children instead
			]
		};
		let bottomForm = {
			components: [
				// [
				// 	{type: 'space'}
				// ],
				[
					{type: 'custom', element: <div><h3><u>{this.context.translate('terms_of_service')}</u></h3><p>{this.context.translate('terms_of_service:detail')}</p></div>}
				],
				[
					{
						type: 'custom',
						element:
							<ol className="terms-wrap">
								<li>{this.context.translate('terms_of_service:1')}</li>
								<li>{this.context.translate('terms_of_service:2')}</li>
								<li>{this.context.translate('terms_of_service:3')}</li>
								<li>{this.context.translate('terms_of_service:4')}</li>
							</ol>
					}
				],
				[
					{type: 'space'}
				],
				{
					center: 'xs',
					items: [
						{type: 'checkbox', name: 'agreement', required: true, showClearButton: false, options: [{id: 'accepted', name: this.context.translate('agree_with_terms_and_conditions')}],  grid: {
							xs: '100%', sm: '303px'
						}}
					]
				}
			]
		};


		// <PageHeading title={this.props.header || 'Header'} description={this.props.description || 'description'} />
		return (
			<div>
				<SemiGrid>
					<Row center="xs" style={{overflow: 'hidden'}}>
						<Col xs="96%" xl="90%" style={{maxWidth: 1400}}>
							<div className="mtpc-logo"></div>
							<Panel title={this.props.header || 'Header'}>
								<div className="pad-normal pr-form">
									<SemiForm data={data} values={values} buttonAlign="center" submitLabel={this.context.translate('submit')} onChange={this.handleFormChange} onSubmit={this.submit}>
										{showMainForm ? <FormGenerator formTemplate={mainForm} /> : null}
										{this.props.children}
										{showMainForm ? <FormGenerator formTemplate={bottomForm} /> : null}
									</SemiForm>
								</div>
							</Panel>
						</Col>
					</Row>
				</SemiGrid>
			</div>
		);
	}
}

MainForm.contextTypes = {
	ajax: PropTypes.object,
	translate: PropTypes.func
};
export default MainForm;
