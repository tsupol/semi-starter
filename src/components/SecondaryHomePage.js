import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
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
		let example = require('../assets/img/upload-example.png');
		return (
			<div>
				<PageHeading title="Home" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col xs lg={10} lgOffset={1}>
							<Panel title="Home">
								<div className="con-pad">
									<Grid>
										<Row>
											<Col xs md={4}>
												<a href="#/hair"><h3>{this.context.translate('menu:hair')}</h3></a>
												<a href="#/hair"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/forehead"><h3>{this.context.translate('menu:forehead')}</h3></a>
												<a href="#/forehead"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/nose"><h3>{this.context.translate('menu:nose')}</h3></a>
												<a href="#/nose"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/nose-recon"><h3>{this.context.translate('menu:nose-recon')}</h3></a>
												<a href="#/nose-recon"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/eyelids"><h3>{this.context.translate('menu:eyelids')}</h3></a>
												<a href="#/eyelids"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/around-eyes"><h3>{this.context.translate('menu:around-eyes')}</h3></a>
												<a href="#/around-eyes"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/eyebrow"><h3>{this.context.translate('menu:eyebrow')}</h3></a>
												<a href="#/eyebrow"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/lips"><h3>{this.context.translate('menu:lips')}</h3></a>
												<a href="#/lips"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/breast"><h3>{this.context.translate('menu:breast')}</h3></a>
												<a href="#/breast"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/chin"><h3>{this.context.translate('menu:chin')}</h3></a>
												<a href="#/chin"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/cheek-bulge"><h3>{this.context.translate('menu:cheek-bulge')}</h3></a>
												<a href="#/cheek-bulge"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/liposuction"><h3>{this.context.translate('menu:liposuction')}</h3></a>
												<a href="#/liposuction"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/implants"><h3>{this.context.translate('menu:implants')}</h3></a>
												<a href="#/implants"><img src={example} width="100%" /></a>
											</Col>
										</Row>
									</Grid>
								</div>
							</Panel>
						</Col>
					</Row>
				</Grid>
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
