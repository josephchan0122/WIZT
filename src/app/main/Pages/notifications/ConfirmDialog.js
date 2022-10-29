import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import axios from "axios";
import requestConfig from "../../config/requestConfig";

class ConfirmDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeContact = (userId) => {
    axios.delete(requestConfig.baseUrl+"/admin/notifications/"+userId+"/").then((res)=>this.ReturnMainPage());
  }

  ReturnMainPage = () => {
    const {history, page} = this.props;
    history.push(
      {
       pathname: "/admin/notifications",
       page : page
      }
    )
    this.props.closeConfirmDialog()
  }

  render() {
    const {closeConfirmDialog, confirmDialog} = this.props;
    return (
      <Dialog
        open={confirmDialog.props.open} // added by myself
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Permanently delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please note that it will delete all the user data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{ // added by myself
            this.removeContact(confirmDialog.user_id);
          }} color="primary" autoFocus>
            Agree
          </Button>
          <Button onClick={()=>{ // added by myself
            closeConfirmDialog();
          }} color="primary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
/** The under part added by myself */
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditContactDialog: Actions.closeEditContactDialog,
        closeNewContactDialog : Actions.closeNewContactDialog,
        addContact            : Actions.addContact,
        updateContact         : Actions.updateContact,
        closeConfirmDialog    : Actions.closeConfirmDialog,
    }, dispatch);
}

function mapStateToProps({NotificationsApp})
{
    return {
      confirmDialog: NotificationsApp.contacts.confirmDialog,
      page: NotificationsApp.contacts.page
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);
