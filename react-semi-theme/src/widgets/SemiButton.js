import React, { PropTypes, Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite, green500, lightGreen500} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';

import {ContentAdd, ActionAutorenew, ActionDelete, HardwareKeyboardArrowRight, HardwareKeyboardArrowLeft} from 'material-ui/svg-icons';
// shift+shift and svg-icons\index to search for the name
// see: https://www.materialui.co/icons, https://design.google.com/icons/

class SemiButton extends Component{
    constructor() {
        super();
        this.linkTo = this.linkTo.bind(this);
    }

    linkTo(){
        if(this.props.link) this.context.router.push(this.props.link);
    }

    render() {
        let props = this.props;
        let {semiType, ...rest} = props;
        let params = {};
        switch(semiType) {
            case 'add':
                params.icon = <ContentAdd color={fullWhite} />;
                params.backgroundColor = green500;
                params.labelColor=fullWhite;
                break;
            case 'refresh':
                params.icon = <ActionAutorenew />;
                break;
            case 'remove':
                params.icon = <ActionDelete />;
                break;
            case 'next':
                params.icon = <HardwareKeyboardArrowRight />;
                break;
            case 'prev':
                params.icon = <HardwareKeyboardArrowLeft />;
                break;
        }
        // if(props.link) params.onClick = this.linkTo();
        return (<RaisedButton labelPosition="before"
                             type="button"
                             className="button rightMargin"
                             onTouchTap={this.linkTo}
                             {...params}
                             {...rest} />);
    }
}

SemiButton.propTypes = {
    link: PropTypes.string
};
SemiButton.contextTypes = {
    router: PropTypes.object
};

export default SemiButton;