import React, {Component} from 'react';
import {MuiThemeProvider, Hidden, Icon, IconButton, Input, Paper, Typography, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import {withRouter} from 'react-router-dom';


class NotificationsHeader extends Component {

    addNote = () => {
        const {history} = this.props;
        history.push({
            pathname: "/admin/plans/note/"
        })
    }

    render()
    {
        const {setSearchText, searchText, pageLayout, mainTheme} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

                <div className="flex flex-shrink items-center sm:w-224">
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => pageLayout().toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>

                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">notifications</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">Notifications</Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

                    <MuiThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <Input
                                    placeholder="Search for anything"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={setSearchText}
                                />
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider>
                </div>
                <div style={{marginRight: 20}}>
                    <Button 
                        onClick={
                            (ev) => {
                                ev.preventDefault();
                                this.addNote();
                            }
                        }
                    >
                        <Icon>
                            add_circle
                        </Icon>
                        <Typography style={{marginLeft:4}}>new</Typography>
                    </Button>
                </div>
            </div>
        )
            ;
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setSearchText,
        openNewContactDialog: Actions.openNewContactDialog,
    }, dispatch);
}

function mapStateToProps({NotificationsApp, fuse})
{
    return {
        searchText: NotificationsApp.contacts.searchText,
        mainTheme : fuse.settings.mainTheme,
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(NotificationsHeader);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationsHeader));
