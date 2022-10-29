import React, {Component} from 'react';
import {Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import axios from "axios";
import requestConfig from '../../config/requestConfig';

class NotificationsList extends Component {

    constructor() {
        super();
        this.state = {
            pageSize: "",
        };
    }
    state = {
        selectedContactsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedContactMenu = (event) => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };

    dateFormat = (date) => {
        let d = new Date(date);
        d = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear()+' '+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");
        return <div>{d}</div>
    }

    fetchData = (state) => {
        //Running when changes occure on table.
        this.setState({
            pageSize: state.pageSize,
        })
        axios.post(requestConfig.baseUrl+"/admin/notifications/pagination/", {pagination_size: state.pageSize})

        let params = {
            page: ""
        }

        if(state.page === 0){
            params.page = 1;
            this.props.getContacts(params);
        }
        else{
            params = {
                page: state.page+1,
            }
            this.props.getContacts(params)
        }
    } 

    render()
    {
        const x = this.state.pageSize;
        const { contacts, page, searchText, confirmDialog, totalPage} = this.props;
        const data = this.getFilteredArray(contacts, searchText);
        let pages = Math.floor(totalPage/x);
        const remainder = totalPage % x;
        if(pages && remainder) 
        {
            pages++; 
        }
        
        if(page)
        {
            var pageNum = page.page-1;
        }
        else
        {
            pageNum = 0;
        }
        
        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no contacts!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    data={data}
                    columns={[
                       
                        {
                            Header    : "No",
                            headerClassName: 'h-52 text-16',
                            accessor  : "no",
                            filterable: false,
                            Cell      : row => (
                                    <span>{ row.index + 1 + this.state.pageSize*pageNum }</span>
                                ),
                            width      : 64,
                            className : "justify-center",
                        },
                        {
                            Header    : "Message",
                            accessor  : "message",
                            filterable: false,
                            sortable  : false,
                        },
                        {
                            Header    : "Created at",
                            accessor  : "created_at",
                            filterable: false,
                            sortable  : false,
                            Cell      : row => (
                                this.dateFormat(row.value)
                            ),
                        },
                        {
                            Header: "",
                            width : 64,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            confirmDialog(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            ),
                            className : "justify-center",
                        }
                    ]}
                    pages={pages}
                    manual
                    onFetchData={this.fetchData}
                    defaultPageSize={10}
                    noDataText="No contacts found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts             : Actions.getContacts,
        getUserData             : Actions.getUserData,
        toggleInSelectedContacts: Actions.toggleInSelectedContacts,
        selectAllContacts       : Actions.selectAllContacts,
        deSelectAllContacts     : Actions.deSelectAllContacts,
        openEditContactDialog   : Actions.openEditContactDialog,
        removeContacts          : Actions.removeContacts,
        removeContact           : Actions.removeContact,
        toggleStarredContact    : Actions.toggleStarredContact,
        toggleStarredContacts   : Actions.toggleStarredContacts,
        setContactsStarred      : Actions.setContactsStarred,
        setContactsUnstarred    : Actions.setContactsUnstarred,
        confirmDialog           : Actions.confirmDialog,   
    }, dispatch);
}

function mapStateToProps({NotificationsApp})
{
    return {
        contacts          : NotificationsApp.contacts.entities,
        totalPage         : NotificationsApp.contacts.totalPage,
        page              : NotificationsApp.contacts.page,
        selectedContactIds: NotificationsApp.contacts.selectedContactIds,
        searchText        : NotificationsApp.contacts.searchText,
        user              : NotificationsApp.user,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationsList));
