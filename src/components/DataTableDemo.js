import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {SemiDataTable, Panel, PageHeading} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';

import IconButton from 'material-ui/IconButton';
import {ContentAdd, ContentCreate, ActionAutorenew, ActionDelete} from 'material-ui/svg-icons';

const data = [
	{
		name: 'John Smith',
		status: 'Employed',
		selected: true
	},
	{
		name: 'Randal White',
		status: 'Unemployed'
	},
	{
		name: 'Stephanie Sanders',
		status: 'Employed',
		selected: true
	},
	{
		name: 'Steve Brown',
		status: 'Employed'
	},
	{
		name: 'Joyce Whitten',
		status: 'Employed'
	},
	{
		name: 'Samuel Roberts',
		status: 'Employed'
	},
	{
		name: 'Adam Moore',
		status: 'Employed'
	}
];

class DataTableDemo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			formShowText: false
		}
	}

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	render() {
		const dataTable =
            <SemiDataTable
                ref="tb"
                settings={{
					table:{
						selectable: false
					},
					header:{
						displaySelectAll: false,
						enableSelectAll: false,
						adjustForCheckbox: false
					},
					body:{
						displayRowCheckbox: false
					},
					actions: {
						create: {
							onClick: () => {
								this.context.router.push(`/users/create`);
							},
							label: 'Add New User'
						},
						reload: false
					},
					filters: {
						width: '600px',
						fields: [
							{type: 'text', name: 'username', label: 'Username', maxWidth: '250px'},
							{type: 'text', name: 'email', label: 'Email', maxWidth: '250px'}
						]
					},
					fields:[
						{
							title: "ID",
							key: "id",
							width: '10%',
							sortable: true
						},
						{
							title: "Username",
							key: "username"
						},
						{
							title: "Email",
							tooltip: "Email (tooltip)",
							key: "email"
						},
						{
							title: "Role",
							key: "role_name",
						},
						{
							title: "Branch",
							key: "branch_name",
						},
						{
							title: "Actions",
							key: 'action',
							width: '10%',
							custom: (row,index,tbDataProps)=>{
								//console.log('tbDataProps', tbDataProps);
								return (
									<div>
										<IconButton>
											<ContentCreate />
										</IconButton>
										<IconButton >
											<ActionDelete />
										</IconButton>
									</div>
								);
							}
						}
					],
					order: [{"column":"id","dir":"DESC"}],
					limit: 10
				}}
                pagination={true}
                dataSourceResult="data"
                dataSourceMap={{data: "tbData", total: "recordsTotal"}}
                dataSource="users"
            />;

		let formTemplate = {
			data: {reasons: [
				{id:1, name: 'a'},
				{id:2, name: 'b'},
				{id:3, name: 'Show'}

			]},
			components: [
				/**
				 * Note: Responsive
				 * Has: xs, sm, md, lg, xl
				 * Can specify in: px, %, em, rem, etc... according to css
				 */
				[
					{type: 'text', name: 'text1', label: 'Text1*', grid: {
						md: '30%'
					}},
					{type: 'text', name: 'text2', label: 'Text2*', grid: {
						md: '70%'
					}}
				],
				[
					{type: 'select', name: 'reasons', label: 'Reason*', maxWidth: '250px', required: true}
				],
				{
					settings: {hide: !this.state.formShowText},
					items: [
						{type: 'text', name: 'testShowHide', label: 'Test Show Hide'}
					]
				}
			]
		};

		return (
			<div>
				<PageHeading title="DataTable Demo" description="description"/>
				<Grid fluid className="content-wrap">
					<Row>
						{
							<Col md={12}>
								<Panel>
									<div className="con-pad">
										<SemiForm formTemplate={formTemplate} onChange={(currentValues)=>{
											if(currentValues.reasons == 3) this.setState({formShowText: true});
											else this.setState({formShowText: false});
										}} />
									</div>
								</Panel>
								<Panel>
									<div className="con-pad">
										{dataTable}
									</div>
								</Panel>
							</Col>
						}
						{
							// Note:
							// I'm trying to make only table has white background, the rest has no background
							// But not cool

							// <Col md={9} style={{paddingTop: 32}}>
							// 	{dataTable}
							// </Col>
						}
						<Col md={3}>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

DataTableDemo.propTypes = {};

export default DataTableDemo;