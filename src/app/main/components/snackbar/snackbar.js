import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});
class SimpleSnackbar extends React.Component {
      constructor(props) {
            super(props)
            this.state = {
                  open: false,
            }
      }

      handleClick = () => {
            this.setState({ open: true });
      };

      handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }
            this.setState({ open: false });
            this.props.data.history.push({
                  pathname: "/app/pages/plans"
            })
      };

      static getDerivedStateFromProps(props, prevState) {
            if(props.open_snack !== prevState.open) {
                  return {open: props.open_snack};
            }
            else {
                  return null;
            }
      }

      render() {
            const { classes, is_new } = this.props;
            return (
                  <div>
                        <Snackbar
                              style={{position:"fixed" , top: 100}}
                              anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                        }}
                        open={this.state.open}
                        autoHideDuration={1000}
                        onClose={this.handleClose}
                        ContentProps={{
                              'aria-describedby': 'message-id',
                        }}
                        message={
                              <span id="message-id">{is_new}</span> 
                        }
                        action={[
                              <IconButton
                              key="close"
                              aria-label="Close"
                              color="inherit"
                              className={classes.close}
                              onClick={this.handleClose}
                              >
                              <CloseIcon />
                              </IconButton>,
                        ]}
                        />
                  </div>
            );
      }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);