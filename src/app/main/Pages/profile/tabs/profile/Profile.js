import React, {Component} from 'react';
import { AppBar, Card, CardContent, Toolbar, Typography, Avatar} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import axios from 'axios';
import requestConfig from "../../../../config/requestConfig"

class Profile extends Component {

    state = {
        id : null,
        name: null,
        email   : null,
        email_verified: null,
        phone_number : null,
        phone_number_verified: null,
        username : null,
        picture : null,
    };

    componentDidMount()
    {
        let item_id = localStorage.getItem('item_id')
        axios.get(requestConfig.baseUrl+"/admin/users/"+item_id+"/").then(res => {
            this.setState(res.data)
        })
    }

    render()
    {
        const {id, name, email, email_verified, phone_number, phone_number_verified, username, picture, photo_in_use, label_in_use, total_label_count, friends_count} = this.state;
        return (
            <div className="md:flex" >

                <div className="flex flex-col flex-1 md:pr-32">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                        {id && (
                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            General Information
                                        </Typography>
                                    </Toolbar>
                                </AppBar>

                                <CardContent>
                                    <div className="mb-24">
                                        <Avatar src={picture} />
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">name</Typography>
                                        <Typography>{name}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">username</Typography>
                                        <Typography>{username}</Typography>
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">email</Typography>
                                        <Typography>{email}</Typography>
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">email_verified</Typography>
                                        <Typography>{email_verified.toString()}</Typography>
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">phone_number</Typography>
                                        <Typography>{phone_number}</Typography>
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">phone_number_verified</Typography>
                                        <Typography>{phone_number_verified.toString()}</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                       
                        
                    </FuseAnimateGroup>
                </div>
                <div className="flex flex-col md:w-512">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                         {id && (
                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            Label Information
                                        </Typography>
                                    </Toolbar>
                                </AppBar>

                                <CardContent>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Photo in use</Typography>
                                        <Typography>{photo_in_use}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Label in use</Typography>
                                        <Typography>{label_in_use}</Typography>
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Total label count</Typography>
                                        <Typography>{total_label_count}</Typography>
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Friends count</Typography>
                                        <Typography>{friends_count}</Typography>
                                    </div>

                                   
                                </CardContent>
                            </Card>
                        )}

                    </FuseAnimateGroup>
                </div>
            </div>
        );
    }
}

export default Profile;
