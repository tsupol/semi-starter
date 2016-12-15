import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
//import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {SemiGrid, Row, Col} from 'react-semi-theme/grid';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class HomePage extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {
		this.initialized();
	}

	initialized = () => {
		return true;
		// let taskReady = this.props.actions.getScheduleTasks(true);
		// let eventsStatusReady = this.props.actions.getScheduleEventsStatus(true);
		// return taskReady && eventsStatusReady;
	};

	render() {
		//let example = require('../assets/img/upload-example.png');
		let icons = Array.from(Array(14), (v, k)=>require(`../assets/img/icon/icon-${('00'+(k+1)).slice(-2)}.png`));
		let rowStyle = {marginBottom: 24};
		let anchorStyle = {textDecoration: 'none'};
		let divStyle = {border: '1px solid #ddd', textAlign: 'center', paddingBottom: 16};
		let headerStyle = {margin: 0, fontSize: 16, height: 32};
		return (
			<div>
				<SemiGrid>
					<Row center="xs" style={{overflow: 'hidden'}}>
						<Col xs="96%" xl="90%" style={{maxWidth: 1400}}>
							<div className="mtpc-logo"></div>
							<Panel title="Home">
								<div className="con-pad">
									<SemiGrid>
										<Row style={rowStyle}>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/hair" style={anchorStyle}><img src={icons[0]} width="100%" /></a>
													<a href="#/hair" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:hair')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/forehead" style={anchorStyle}><img src={icons[1]} width="100%" /></a>
													<a href="#/forehead" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:forehead')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/nose" style={anchorStyle}><img src={icons[2]} width="100%" /></a>
													<a href="#/nose" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:nose')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/nose-recon" style={anchorStyle}><img src={icons[3]} width="100%" /></a>
													<a href="#/nose-recon" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:nose-recon')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/eyelids" style={anchorStyle}><img src={icons[4]} width="100%" /></a>
													<a href="#/eyelids" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:eyelids')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/around-eyes" style={anchorStyle}><img src={icons[5]} width="100%" /></a>
													<a href="#/around-eyes" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:around-eyes')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/eyebrow" style={anchorStyle}><img src={icons[6]} width="100%" /></a>
													<a href="#/eyebrow" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:eyebrow')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/lips" style={anchorStyle}><img src={icons[7]} width="100%" /></a>
													<a href="#/lips" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:lips')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/breast" style={anchorStyle}><img src={icons[8]} width="100%" /></a>
													<a href="#/breast" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:breast')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/chin" style={anchorStyle}><img src={icons[9]} width="100%" /></a>
													<a href="#/chin" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:chin')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/cheek-bulge" style={anchorStyle}><img src={icons[10]} width="100%" /></a>
													<a href="#/cheek-bulge" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:cheek-bulge')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/liposuction/arm" style={anchorStyle}><img src={icons[11]} width="100%" /></a>
													<a href="#/liposuction/arm" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:liposuction-arm')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/liposuction/leg" style={anchorStyle}><img src={icons[11]} width="100%" /></a>
													<a href="#/liposuction/leg" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:liposuction-leg')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/liposuction/body" style={anchorStyle}><img src={icons[11]} width="100%" /></a>
													<a href="#/liposuction/body" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:liposuction-body')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/liposuction/facial" style={anchorStyle}><img src={icons[11]} width="100%" /></a>
													<a href="#/liposuction/facial" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:liposuction-facial')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/implants" style={anchorStyle}><img src={icons[12]} width="100%" /></a>
													<a href="#/implants" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:implants')}</SemiHeader></a>
												</div>
											</Col>
											<Col md="20%" xs="50%">
												<div style={divStyle}>
													<a href="#/others" style={anchorStyle}><img src={icons[13]} width="100%" /></a>
													<a href="#/others" style={anchorStyle}><SemiHeader style={headerStyle}>{this.context.translate('menu:others')}</SemiHeader></a>
												</div>
											</Col>
										</Row>
									</SemiGrid>
								</div>
							</Panel>
						</Col>
					</Row>
				</SemiGrid>
			</div>
		);
	}
}

// const mapStateToProps = ({user, notification}) => ({user, notification});
// const mapDispatchToProps = (dispatch) => ({
//   actions: {
//     getScheduleTasks: bindActionCreators(notificationActions.getScheduleTasks, dispatch),
//     getScheduleEventsStatus: bindActionCreators(notificationActions.getScheduleEventsStatus, dispatch)
//   }
// });
// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
HomePage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default HomePage;
