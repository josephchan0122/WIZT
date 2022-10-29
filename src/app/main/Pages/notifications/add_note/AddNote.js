import React, {Component} from 'react';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {Icon, Typography, TextField, Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import requestConfig from "../../../config/requestConfig";
import axios from "axios";

const styles = theme => ({
    layoutRoot: {}
});

class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message_type: "0",
            message: "",
            send_to: "1",
            message_is_required: false,
        }
    }

    onSubmit = () => {
        const data = {
            message_type: "0",
            message: this.state.message,
            send_to: "1"
        }

        const {history} = this.props;
        if(data.message ==="") {
            this.setState({
                message_is_required: true
            })
        }
        else {
            axios.post(requestConfig.baseUrl+"/admin/notifications/", data).then((res)=>(
                history.push({
                    pathname:"/admin/notifications/"
                })
            )
            );
        }

    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value,
            message_is_required: false,
        })
    }

    render()
    {
        return (
            <FusePageSimple
                header={
                    <div className="flex items-center" style={{marginLeft: 20}}>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">edit</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">AddNote</Typography>
                        </FuseAnimate>
                    </div>
                }
                contentToolbar={
                    <div className="px-24"></div>
                }
                content={
                    <div className="p-24 flex items-center justify-center" >
                        <Grid container justify="flex-end" spacing={8} item sm={6}>
                            <Grid item container sm={12} justify="flex-end">
                                <Grid item>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label={this.state.message_is_required? "This field is required": "Leave your message"}
                                        multiline
                                        rows="9"
                                        // value={values.multiline}
                                        onChange={ (ev) =>this.handleChange(ev)}
                                        error={this.state.message_is_required}
                                        margin="normal"
                                        variant="outlined"
                                        style={{width: 790}}
                                    />    
                                </Grid>
                            </Grid>
                            <Grid item container sm={12} justify="flex-end">
                                <Grid item>
                                    <Button 
                                        color="secondary" 
                                        contained="raised"
                                        variant="contained"
                                        onClick={this.onSubmit}
                                    >
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                }
            />
        )
    }
}


  
export default withRouter(AddNote);