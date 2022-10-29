import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {FuseAnimateGroup, TextFieldFormsy} from '@fuse';
import requestConfig from "../../config/requestConfig";
import axios from "axios";
import Snackbar from "./component/Snackbar";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: "#000",
    border: '1px solid #ced4da',
  },
  marginLeft:{
    marginLeft:23
  }
});

 class Form_password extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            current_password: "",
            new_password: "1",
            confirm_password: "2",
            open_snackbar: false,
        }
    }

    handleChange = (event) => {
        this.setState({
        [event.target.name] : event.target.value
        })
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = () => {
        const data = {
            current_password  : this.state.current_password,
            new_password      : this.state.new_password,
        }
        axios.post(requestConfig.baseUrl+"/admin/account/password/", data).then((res)=>{
            this.setState({
                open_snackbar: true,
            })
        }).catch(
            error=> {
                this.form.updateInputsWithError({
                    current_password: "The password is invalid"
                });
            }
        )
    }

    render(){
        const {canSubmit, new_password, confirm_password} = this.state;
        return(
        <React.Fragment>
        <FuseAnimateGroup animation="transition.shrinkIn" delay={300} duration={400}>
        {/* snack bar */}
            <Snackbar open={this.state.open_snackbar} />
            <Typography variant="h6" gutterBottom>
            Change password
            </Typography>
            <Formsy
            className="flex flex-col justify-center w-full"
            onValid={this.enableButton}
            ref={(form) => this.form = form}
            >
            <Grid container spacing={16}>
                <Grid 
                item
                container sm={12}
                alignItems={"center"}
                direction={"row"}
                justify={"center"}     
                >
                <Grid item sm={1}>
                    <Typography variant="subtitle1">
                    Current password 
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} style={{marginLeft: 12}}>
                    <TextFieldFormsy
                        type="password"
                        name="current_password"
                        validations={{
                            minLength: true
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        fullWidth
                        variant="outlined"
                        inputProps={{
                            style: {
                            padding: 10
                            }
                        }}
                        onChange={this.handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid 
                item
                container sm={12}
                alignItems={"center"}
                direction={"row"}
                justify={"center"}     
                >
                <Grid item sm={1}>
                    <Typography variant="subtitle1">
                    New password 
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} style={{marginLeft: 12}}>
                    <TextFieldFormsy
                    type="password"
                    name="new_password"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    fullWidth
                    variant="outlined"
                    inputProps={{
                        style: {
                        padding: 10
                        }
                    }}
                    onChange={this.handleChange}
                    />
                </Grid>
                </Grid>
                <Grid 
                item
                container sm={12}
                alignItems={"center"}
                direction={"row"}
                justify={"center"}     
                >
                <Grid item sm={1}>
                    <Typography variant="subtitle1">
                    Confirm
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} style={{marginLeft: 12}}>
                    <TextFieldFormsy
                    type="password"
                    name="confirm_password"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    fullWidth
                    variant="outlined"
                    inputProps={{
                        style: {
                        padding: 10
                        }
                    }}
                    onChange={this.handleChange}
                    />
                </Grid>
                </Grid>
                <Grid 
                item
                container sm={12}
                alignItems={"center"}
                direction={"row"}
                justify={"center"}     
                >
                <Grid 
                    item
                    container 
                    xs={6} 
                    sm={5}
                    style={{marginLeft: 12}}
                    justify={"flex-end"}
                >
                    <Button 
                    color="secondary" 
                    contained="raised"
                    variant="contained" 
                    disabled={new_password ===confirm_password? false : true}
                    onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
                </Grid>
            </Grid>
            </Formsy>
        </FuseAnimateGroup>
        </React.Fragment>
        );
    }
}
Form_password.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form_password);