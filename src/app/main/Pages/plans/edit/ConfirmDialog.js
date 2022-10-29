import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import requestConfig from "../../../config/requestConfig";
import Snackbar from "../../../components/snackbar/snackbar";

class ConfirmDialog extends React.Component {
  state = {
    open: false,
    snack: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  closeConfirmDialog = () => {
    this.setState({ open: true });
  }

  static getDerivedStateFromProps(props, prevState) {
    if(props.is_delete !== prevState.open) {
      return {
        open: true,
      }
    }
    else {
      return {
        open: false
      }
    }
  }

  onDelete = () => {
    const state = this.props.parent
    const id = state.id;
    axios.delete(requestConfig.baseUrl+"/admin/plans/"+id+"/")
       .then((response) => {
          if(response.data ==="")
          {
             this.setState({snack:true, infor:"Plan deleted successfully."}); /**open snackbar*/
          }
       }
    );
  }
  
  render() {
    const infor = this.state.infor;
    return (
      <div>
         {
            this.state.snack? 
            /**fire snackbar*/
            <Snackbar open_snack={
              this.state.snack
            } 
              is_new={infor}
              data={this.props.history}
            /> 
            : ""
         }
        <Dialog
          open={this.state.open} // added by myself
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
            <Button onClick={()=>{  // added by myself
              this.onDelete()
              // this.closeConfirmDialog();
            }} color="primary">
              Agree
            </Button>
            <Button onClick={() =>{ // added by myself
              // removeContact(this.props.confirmDialog.user_id);
              this.closeConfirmDialog();
            }} color="primary" autoFocus>
              Disagree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
