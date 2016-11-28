import React, {Component, PropTypes} from 'react';

class SubmittedPage extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount(){
		this.context.dialog.alert("ขอขอบพระคุณที่ให้ความสนใจกับทางเรา ทางเราจะทำการติดต่อถึงท่านเร็วๆนี้", "ทางเราได้รับข้อมูลเรียบร้อย", "success", ()=>{
			this.context.router.replace('/');
		});
	}

	render() {
		return <div style={{height: '100vh'}}></div>;
	}
}

// const mapStateToProps = ({user, notification}) => ({user, notification});
// const mapDispatchToProps = (dispatch) => ({
//   actions: {
//     getScheduleTasks: bindActionCreators(notificationActions.getScheduleTasks, dispatch),
//     getScheduleEventsStatus: bindActionCreators(notificationActions.getScheduleEventsStatus, dispatch)
//   }
// });
// export default connect(mapStateToProps, mapDispatchToProps)(SubmitedPage);
SubmittedPage.contextTypes = {
	dialog: PropTypes.object,
	router: PropTypes.object,
	translate: PropTypes.func
};
export default SubmittedPage;
