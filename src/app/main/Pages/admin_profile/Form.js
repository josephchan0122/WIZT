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

 class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      firstName: "",
      email: "",
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

  componentDidMount() {
    this.setState({
      name: this.props.name,
      email: this.props.email
    })
  }

  onSubmit = () => {
    const data = {
      name  : this.state.firstName,
      email : this.state.email,
    }
    axios.post(requestConfig.baseUrl+"/admin/account/", data).then((res)=>{
      this.setState({
          open_snackbar: true,
      })
    })
  }

  render(){
    const {canSubmit} = this.state;
    return(
      <React.Fragment>
      <FuseAnimateGroup animation="transition.shrinkIn" delay={300} duration={400}>
      {/* snack bar */}
        <Snackbar open={this.state.open_snackbar} is_profile={true} />
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Formsy
          className="flex flex-col justify-center w-full"
          onValid={this.enableButton}
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
                  Name
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} style={{marginLeft: 12}}>
                <TextFieldFormsy
                    required
                    type="text"
                    name="firstName"
                    fullWidth
                    inputProps={{
                      style: {
                        padding: 10
                      }
                    }}
                    value={this.state.name}
                    variant="outlined"
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
                  Email
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} style={{marginLeft: 12}}>
                <TextFieldFormsy
                  required
                  type="text"
                  name="email"
                  fullWidth
                  validations="isEmail"
                  validationErrors={{
                      isEmail: 'Please enter a valid email'
                  }}
                  inputProps={{
                    style: {
                      padding: 10
                    }
                  }}
                  value={this.state.email}
                  variant="outlined"
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
                  disabled={!canSubmit}
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
Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);