import React, {Component} from 'react';
import {withStyles,} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import LabelsList from './LabelsList';
import LabelsHeader from './LabelsHeader';
import EditDialog from './EditDialog';
import ConfirmDialog from './ConfirmDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 90,
        zIndex  : 99
    }
});

class LabelsApp extends Component {

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
                        <LabelsHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <LabelsList/>
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
        openNewContactDialog: Actions.openNewContactDialog
    }, dispatch);
}

function mapStateToProps({labelsApp})
{
    return {
        contacts          : labelsApp.contacts.entities,
        selectedContactIds: labelsApp.contacts.selectedContactIds,
        searchText        : labelsApp.contacts.searchText,
        user              : labelsApp.user
    }
}

export default withReducer('labelsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LabelsApp))));
