import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {Icon, Typography, Card} from '@material-ui/core';
import Form from "./Form";
import Form_password from "./Form_password";
import requestConfig from "../../config/requestConfig";
import axios from "axios";

const styles = theme => ({
    layoutRoot: {}
});

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            email: ""
        }
    }

componentDidMount() {
    axios.get(requestConfig.baseUrl+"/profile/").then((res)=>{
        this.setState({
            name : res.data.name,
            email: res.data.email,
        })
    })
}
    render()
    {   
        const data = this.props.location.state
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                     data==="admin"? (
                        <div className="flex items-center" style={{marginLeft: 20}}>
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Icon className="text-32 mr-12">account_circle</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography variant="h6" className="hidden sm:flex">Profile</Typography>
                            </FuseAnimate>
                        </div>
                    ):
                    (
                        <div className="flex items-center" style={{marginLeft: 20}}>
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Icon className="text-32 mr-12">vpn_key</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography variant="h6" className="hidden sm:flex">Password</Typography>
                            </FuseAnimate>
                        </div>
                    )
                }
                content={
                    <div className="p-24">
                        { data==="admin"? 
                            (
                                <Form profile={this.state} />
                            ):
                            (
                                <Form_password />
                            )
                        }
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Admin);