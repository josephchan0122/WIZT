import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import TransactionsList from './TransactionsList';
import TransactionsHeader from './TransactionsHeader';
import EditDialog from './EditDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import ConfirmDialog from './ConfirmDialog';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class TransactionsApp extends Component {

    componentDidMount()
    {
        // this.props.getContacts(params);
        this.props.getUserData();
    }

    componentDidUpdate(prevProps)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getContacts(this.props.match.params);
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
                        <TransactionsHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <TransactionsList/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <EditDialog/>
                <ConfirmDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts         : Actions.getContacts,
        getUserData         : Actions.getUserData,
        openNewContactDialog: Actions.openNewContactDialog
    }, dispatch);
}

function mapStateToProps({transactionsApp})
{
    return {
        contacts          : transactionsApp.contacts.entities,
        selectedContactIds: transactionsApp.contacts.selectedContactIds,
        searchText        : transactionsApp.contacts.searchText,
        user              : transactionsApp.user
    }
}

export default withReducer('transactionsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsApp))));
