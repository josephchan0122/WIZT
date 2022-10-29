import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';

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

 function AddressForm() {
  return (
    <React.Fragment>
      <FuseAnimateGroup animation="transition.shrinkIn" delay={300} duration={400}>
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
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
                First name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                id="firstName"
                name="firstName"
                // label="First name"
                fullWidth
                autoComplete="fname"
                variant="outlined"
                inputProps={{
                  style: {
                    padding: 10
                  }
                }}
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
                Last name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                id="lastName"
                name="lastName"
                // label="First name"
                fullWidth
                autoComplete="fname"
                variant="outlined"
                inputProps={{
                  style: {
                    padding: 10
                  }
                }}
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
            <Grid item xs={6} sm={4}>
              <TextField
                id="address"
                name="address"
                fullWidth
                variant="outlined"
                placeholder="yahoo@gmail.com"
                inputProps={{
                  style: {
                    padding: 10
                  }
                }}
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
                Address
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                id="address"
                name="address"
                fullWidth
                variant="outlined"
                placeholder="San Angelo, TX 76904, United States"
                inputProps={{
                  style: {
                    padding: 10
                  }
                }}
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
              justify={"flex-end"}
            >
              <Button 
                color="secondary" 
                contained="raised"
                variant="contained" 
              >
                  Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </FuseAnimateGroup>
    </React.Fragment>
  );
}
AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);