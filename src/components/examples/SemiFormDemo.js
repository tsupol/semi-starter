import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm, FormGenerator} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';

class SemiFormDemo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			interested_in_liposuction: false,
			interested_in_other: false
		};
	}

	componentWillMount() {
		this.initialized();
	}

	initialized = () => {
		return true;
	};

	handleFormChange = (data)=> {

	};

	submit = (data)=> {
		console.log('data', data);
	};

	render() {
		let options = [
			{id:'1', name:'Align Center with Minus Offset'}
		];

		// You can pass data/values objects to SemiForm(Recommended) or FormGenerator
		let data = {
			options: [
				{id: '1', name: 'Align Center with Minus Offset'}
			]
		};
		let values= {
			first_name: 'John Doe',
			options: 1
		};

		let formTemplate1 = {
			components: [
				[
					{type: 'custom', element: <h3>Auto Width</h3>}
				],
				[
					{type: 'text', name: 'first_name', label: 'First Name'},
					{type: 'text', name: 'last_name', label: 'Last Name', icon: 'SocialPerson', iconColor: 'green'},
					{type: 'text', name: 'nick_name', label: 'Nick Name', icon: 'ActionStars'}
				]
			]
		};
		let formTemplate2 = {
			components: [
				[
					{type: 'custom', element: <h3>Using Grid</h3>}
				],
				[
					{type: 'text', name: 'job', label: 'Right then Middle then Full', validations:'isEmail', grid: {
						xs: '100%', md: '50%', mdOffset: '25%', xl: '40%', xlOffset: '60%'
					}}
				],
				// [
				// 	{type: 'multiselect', name: 'options', label: 'Test', required:true, grid: {
				// 		xs: '100%', md: '50%', mdOffset: '25%', xl: '40%', xlOffset: '60%'
				// 	}}
				// ],
				[
					{type: 'text', name: 'job', label: '50px', grid: {
						xs: '50px'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%', grid: {
						xs: 'calc(50% - 25px)'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%', grid: {
						xs: 'calc(50% - 25px)'
					}}
				],
				[
					{type: 'label', label: 'Fixed Label:', grid: {
						xs: '100%', smAlign: 'right', sm: '200px'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%, xs 100%', grid: {
						xs: '100%', sm: 'calc(50% - 100px)'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%, xs 100%', grid: {
						xs: '100%', sm: 'calc(50% - 100px)'
					}}
				],
				[
					{type: 'label'} // empty row
				],
				[
					{type: 'label', grid: {
						xs: '0%', md: '50%'
					}},
					{type: 'checkbox', name: 'test', multiple: true, showClearButton: false, options,  grid: {
						xs: '100%', md: '294px', mdOffset: '-147px' // For align center, offset = -width/2
					}}
				]
			]
		};
		
		return (
			<div>
				<PageHeading
					title="Form Demo (Try resizing your browser)"
					description="SemiForm are now more flexible!"
				/>
				<Grid fluid className="content-wrap">
					<Row>
						<Col xs md={9}>
							<SemiForm
								data={data} values={values}
								onChange={this.handleFormChange}
								onSubmit={this.submit}
								buttonAlign="center"
								submitLabel="Outside Panel"
							>
								<Panel>
									<div className="pad-normal">
										<FormGenerator formTemplate={formTemplate1} />
									</div>
								</Panel>
								<Panel>
									<div className="pad-normal">
										<FormGenerator formTemplate={formTemplate2} />
									</div>
								</Panel>
							</SemiForm>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

SemiFormDemo.contextTypes = {
	ajax: PropTypes.object
};
export default SemiFormDemo;
