import React, {Component} from 'react';
import {withStyles, Avatar, Tab, Tabs, Typography} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import Profile from './tabs/profile/Profile';
import LabelsApp from './tabs/labels/LabelsApp';
import FriendsApp from './tabs/friends/FriendsApp';
import FloorPlansApp from './tabs/floorplans/FloorPlansApp';

const styles = theme => ({
    layoutHeader : {
        height   : 150,
        minHeight: 150,
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    }
});

class ProfilePage extends Component {

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render()
    {
        const {classes} = this.props;
        const {value} = this.state;
        const user = {
            name    : localStorage.getItem("name"),
            imgURL  : localStorage.getItem("imgURL")
        }
        if(user.imgURL === "null") {

            console.log("user.imgURL")
        }

        return (
            <FusePageSimple
                classes={{
                    header : classes.layoutHeader,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Avatar className="w-96 h-96" src={user.imgURL==="null"? "" : user.imgURL}/>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="md:ml-24" variant="h4" color="inherit">{user.name}</Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        classes={{
                            root: "h-64 w-full border-b-1"
                        }}
                    >
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Profile"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Labels"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Floor Plans"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }}
                            label="Friends"/>
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24">
                        {value === 0 && (
                            <Profile/>
                        )}
                        {value === 1 && (
                            <LabelsApp />
                        )}
                        {value === 2 &&
                        (
                            <FloorPlansApp/>
                        )}
                        {value === 3 && (
                            <FriendsApp/>
                        )}
                    </div>
                }
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(ProfilePage);
