import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import UsersList from './UsersList';
import UsersHeader from './UsersHeader';
import EditDialog from './EditDialog';
import ConfirmDialog from './ConfirmDialog';
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
class UsersApp extends Component {

    componentDidMount()
    {
        // this.props.getContacts(this.props.match.params);
        this.props.getUserData();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getContacts(this.props.location.page);
        }
    }

    render()
    {
        const {classes, openNewContactDialog} = this.props;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <UsersHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <UsersList/>
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
        confirmDialog       : Actions.confirmDialog,  
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        contacts          : usersApp.contacts.entities,
        selectedContactIds: usersApp.contacts.selectedContactIds,
        searchText        : usersApp.contacts.searchText,
        user              : usersApp.user
    }
}

export default withReducer('usersApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersApp))));
