import React, {PropTypes, Component} from 'react';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {ActionHome, NavigationMenu, ActionAccountBox, ActionPowerSettingsNew, NavigationMoreVert} from 'material-ui/svg-icons';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import {Confirm, Alert, SideMenu} from 'react-semi-theme/widgets';
import helper from 'react-semi-theme/libs/helper';

import 'flag-icon-css/css/flag-icon.min.css';

class SecondaryLayout extends Component {
    constructor(props, context) {
        super(props, context);
        this.linkTo = this.linkTo.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
        this.openAlert = this.openAlert.bind(this);

        let {query} = props.location;
        let showMenu = (query['show-menu']=='true' || query['show-menu'] == '1');
        let defaultLocale = props.locale;
        let currentLocale = query['locale'] || defaultLocale;
        this.state = {
            showMainMenu: showMenu,
            languages: {
                items: [
                    {icon: <FontIcon className="flag-icon flag-icon-th" />, name: 'ไทย', locale: 'th'},
                    {icon: <FontIcon className="flag-icon flag-icon-gb" />, name: 'English', locale: 'en'}
                ],
                defaultLocale,
                currentLocale,
                openMenu: false,
                anchorEl: null
            }
        };
    }

    linkTo(pathname) {
        return this.context.router.push(pathname);
    }

    getChildContext() {
        return { dialog: { confirm: this.openConfirm, alert: this.openAlert } }
    }

    openConfirm(...params) {
        console.log('openConfirm');
        this.refs.confirm.open(params);
    }

    openAlert(...params) {
        // console.log('description', title, description);
        this.refs.alert.open(params);
    }

    toggleMainMenu = () => {
        this.setState({showMainMenu: !this.state.showMainMenu});
    };

    render() {
        // console.log('render: layout', this.props.user);
        let showMainMenu = this.state.showMainMenu;
        let settings = this.props.settings;
        let {query} = this.props.location;
        let {setLocale} = this.props.actions;

        let toolsMenu = null;

        /*
        let languages = this.state.languages.items.map((lang, i)=>{
            return (
                <MenuItem key={i} primaryText={lang.name} onTouchTap={()=>{
                    let localeQuery = lang.locale==this.state.languages.defaultLocale ? undefined : lang.locale;
                    let nextQuery = Object.assign({}, query, {'locale': localeQuery});
                    this.context.router.replace(Object.assign({}, this.props.location, {query: nextQuery}));
                    this.setState({languages: Object.assign({}, this.state.languages, {currentLocale: lang.locale, openMenu: false, anchorEl: null})});
                    setLocale(lang.locale);
                }} />
            );
        });
        let lang = this.state.languages.items.filter((l)=>l.locale==this.state.languages.currentLocale)[0];
        */
        let languages = this.state.languages.items.map((lang, i)=> {
            return (
                <FlatButton key={i} className="icon-btn left-most" icon={lang.icon} backgroundColor={lang.locale==this.state.languages.currentLocale ? 'rgba(153, 153, 153, 0.2)' : ''} onTouchTap={()=>{
                    let localeQuery = lang.locale==this.state.languages.defaultLocale ? undefined : lang.locale;
                    let nextQuery = Object.assign({}, query, {'locale': localeQuery});
                    this.context.router.replace(Object.assign({}, this.props.location, {query: nextQuery}));
                    this.setState({languages: Object.assign({}, this.state.languages, {currentLocale: lang.locale, openMenu: false, anchorEl: null})});
                    setLocale(lang.locale)
                }} />
            )
        });
        let showMenu = (query['show-menu']=='true' || query['show-menu'] == '1');
        return (
            <div id="layout" className={`${showMainMenu ? '' : 'no-menu'}`} onKeyPress={(e)=>{
                if(e.charCode==76){
                    let nextLang = this.state.languages.items.filter((lang)=>lang.locale!=this.state.languages.currentLocale)[0];
                    let localeQuery = nextLang.locale==this.state.languages.defaultLocale ? undefined : nextLang.locale;
                    let nextQuery = Object.assign({}, query, {'locale': localeQuery});
                    this.context.router.replace(Object.assign({}, this.props.location, {query: nextQuery}));
                    this.setState({languages: Object.assign({}, this.state.languages, {currentLocale: nextLang.locale, openMenu: false, anchorEl: null})});
                    setLocale(nextLang.locale);
                }
                if(e.charCode==77){
                    let nextQuery = Object.assign({}, query, {'show-menu': !showMenu || undefined});
                    this.context.router.replace(Object.assign({}, this.props.location, {query: nextQuery}));
                    this.setState({showMainMenu: !showMenu});
                }
            }} tabIndex="1" >
                <Confirm ref="confirm" />
                <Alert ref="alert" />
                <Drawer open={showMainMenu} className={`menu-wrapper ${showMainMenu ? '' : 'minimize'}`}>
                    <Toolbar className="side-nav-bar"><ToolbarTitle text="Navigation"/></Toolbar>
                    <SideMenu location={this.props.location} menu={this.props.mainMenu} />
                </Drawer>
                <Paper className="top-nav-wrap" zDepth={1}>
                    <Toolbar className="top-nav-bar">
                        <ToolbarGroup firstChild={true}>
                            {/*FlatButton className="icon-btn left-most" icon={<NavigationMenu />} onTouchTap={this.toggleMainMenu} />
                            <IconButton iconClassName="muidocs-icon-custom-github"/>*/}
                            <FlatButton className="icon-btn left-most" icon={<ActionHome />} onTouchTap={()=>this.context.router.push('/')} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            {/*
                            <FlatButton className="icon-btn left-most" icon={lang.icon} onTouchTap={(event)=>{event.preventDefault();this.setState({languages: Object.assign(this.state.languages, {openMenu: !this.state.languages.openMenu, anchorEl: event.currentTarget})})}}/>
                            <Popover
                                open={this.state.languages.openMenu}
                                anchorEl={this.state.languages.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                onRequestClose={()=>this.setState({languages: Object.assign(this.state.languages, {openMenu: false, anchorEl: null})})} >
                                <Menu>
                                    {languages}
                                </Menu>
                            </Popover>
                            */}
                            {languages}
                            <ToolbarTitle text={settings.toolbarTitle} />
                            {toolsMenu}
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>
                <div className={`main-wrap`}>
                    {React.cloneElement(this.props.children, {locale: this.props.locale, setLocale})}
                </div>
            </div>
        );
    }
}

SecondaryLayout.propTypes = {
    location: PropTypes.object.isRequired,
    appBarTitle: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};
SecondaryLayout.contextTypes = {
    router: PropTypes.object
};
SecondaryLayout.childContextTypes = {
    dialog: PropTypes.object
};
export default SecondaryLayout;