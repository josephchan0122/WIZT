import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import NotificationsList from './NotificationsList';
import NotificationsHeader from './NotificationsHeader';
import ConfirmDialog from './ConfirmDialog';
import EditDialog from './EditDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';


const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class NotificationsApp extends Component {

    componentDidMount()
    {
        // this.props.getContacts(this.props.match.params);
        this.props.getUserData();
    }

    componentDidUpdate(prevProps)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getContacts(this.props.location.page);
        }
    }

    render()
    {
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <NotificationsHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <NotificationsList/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <EditDialog/>
                <ConfirmDialog history={this.props.history} />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts         : Actions.getContacts,
        getUserData         : Actions.getUserData,
        openNewContactDialog: Actions.openNewContactDialog,
    }, dispatch);
}

function mapStateToProps({NotificationsApp})
{
    return {
        contacts          : NotificationsApp.contacts.entities,
        selectedContactIds: NotificationsApp.contacts.selectedContactIds,
        searchText        : NotificationsApp.contacts.searchText,
        user              : NotificationsApp.user
    }
}

export default withReducer('NotificationsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationsApp))));
