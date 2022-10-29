import React, {Component} from 'react';
import { Avatar, Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import ChipsArray from '../../components/chips/ChipsArray';
import axios from 'axios';
import requestConfig from '../../config/requestConfig';
class LabelsList extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loading: true,
            prev: 0,
            pageSize: 10,
            page: 0
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

    componentDidMount() {
        let params;
        params = {
            page: 1,
            page_size: 10
        }
        this.props.getContacts(params);
    }

    onPageChange = (pageIndex) => {
        let params;
        this.setState({page:pageIndex});
        params = {
            page: pageIndex+1,
            page_size: this.state.pageSize,
        }
        this.props.getContacts(params);
    }

    onPageSizeChange = (pageIndex, pageSize) => {
        let params;
        this.setState({
            page: 0,
            pageSize:pageIndex
        });
        params = {
            page: 1,
            page_size: pageIndex,
        }
        this.props.getContacts(params);
    }

    avatar = (row) => {
        if(row.value) {
            var jsObjects = row.value;
            var result = jsObjects.filter(obj => {
                    return obj.is_cover === true
                })
            let results = result.map(a => a.thumbnail);
            return  <Avatar  alt={row.original.name} src={results[0]} style={{borderRadius:0}} />
        }
    }
    dateFormat = (date) => {
        var d = new Date(date);
        d = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear()+' '+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");
        return <div>{d}</div>
    }

    render()
    {
        const x = this.state.pageSize;
        const { contacts, loading, page, searchText, openEditContactDialog, confirmDialog, totalPage } = this.props;
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
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    openEditContactDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
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
                            className : "justify-center"
                        },
                        {
                            Header    : "",
                            headerClassName: 'h-52 text-16',
                            accessor  : "images",
                            filterable: false,
                            sortable  : false,
                            width     : 64, 
                            className: "justify-center",
                            Cell      : row => (
                                this.avatar(row)
                            ),
                        },
                        {
                            Header    : "Name",
                            headerClassName: 'h-52 text-16',
                            accessor  : "name",
                            filterable: false,
                            sortable  : false,
                            width     : 250, 
                        },
                        {
                            Header    : "Location",
                            headerClassName: 'h-52 text-16',
                            accessor  : "location",
                            filterable: false,
                            sortable  : false,
                        },
                        {
                            Header    : "Tags",
                            headerClassName: 'h-52 text-16',
                            accessor  : "tags",
                            Cell      : row => (
                                <ChipsArray data={row.value} isEdit={false} />
                            ),
                            filterable: false,
                            sortable  : false,
                        },
                        {
                            Header    : "Created_by",
                            headerClassName: 'h-52 text-16',
                            accessor  : "id",
                            filterable: false,
                            sortable  : false,
                        },
                        {
                            Header    : "Created_at",
                            headerClassName: 'h-52 text-16',
                            accessor  : "created_at",
                            Cell      : row => (
                                this.dateFormat(row.value)
                            ),
                            filterable: false,
                            sortable  : false,
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
                            className: "justify-center"
                        }
                    ]}
                    loading={loading}
                    page={this.state.page}
                    pageSize={this.state.pageSize}
                    pages={pages}
                    onPageChange={this.onPageChange}
                    onPageSizeChange={this.onPageSizeChange}
                    onFetchData={this.fetchData}
                    defaultPageSize={10}
                    manual
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

function mapStateToProps({labelsApp})
{
    return {
        contacts          : labelsApp.contacts.entities,
        totalPage         : labelsApp.contacts.totalPage,
        page              : labelsApp.contacts.page,
        selectedContactIds: labelsApp.contacts.selectedContactIds,
        searchText        : labelsApp.contacts.searchText,
        user              : labelsApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LabelsList));
