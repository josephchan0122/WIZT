import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { renderComponent } from 'recompose';

class SimpleSnackbar extends React.Component {
     
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    
    static getDerivedStateFromProps(props, prevState) {
        if(props.open !== prevState.open) {
            return {open: props.open};
        }
        else {
            return {open: false};
        }
    }

    handleClose = () => {
        this.setState({
            open: true,
        })
    }
    render() {
        const {is_profile} = this.props;
        return (
            <div>
                <Snackbar
                    style={{position:"fixed" , top: 100}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={!is_profile? <span id="message-id">The password is changed</span> : <span id="message-id">The email is changed</span>}
                    action={[
                        <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                // className={classes.close}
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

export default SimpleSnackbar;
