import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import requestConfig from "../../../config/requestConfig";
import {withRouter} from 'react-router-dom';
import Snackbar from "../../../../main/components/snackbar/snackbar";
import ConfirmDialog from "./ConfirmDialog";

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
      },
      textField: {
         marginLeft: theme.spacing.unit,
         marginRight: theme.spacing.unit,
      },
      menu: {
         width: 500,
      },
      input: {
         display: "none",
      }
   
   });

   const currencies = [
      {
        value: 'USD',
        label: '$',
      },
      {
        value: 'SGD',
        label: 'S$',
      },
   ];

class Plan extends Component {

   constructor(props) {
      super(props)
      this.state = {
         id:"",
         product_id: "",
         price: "",
         currency: "",
         name: "",
         sub_name:"",
         photo_count:"",
         label_count:"",
         description:"",
         is_free:false,
         icon: {},
      
         product_id_is_required: false,
         price_is_required: false,
         currency_is_required: false,
         name_is_required: false,
         sub_name_is_required: false,
         photo_count_required: false,
         label_count_is_required: false,
         description_is_required: false,
         is_free_is_required: false,
         fileName_is_required: false,

         open: false,
         vertical: 'top',
         horizontal: 'center',
         infor: "",
         fileURL: "",
         fileName: "",
         imgChanged: false,
         delete : false,
      }
   }

   componentDidMount() {
      let icon;
      if(this.props.data.icon === null) {
         icon = "";
         this.setState({ ...this.props.data, fileName: icon})
      }
      else {
         icon = this.props.data.icon.toString().slice(33);
         this.setState({ ...this.props.data, fileName: icon})
      }
   }

   handleChange = name=> event => {
      if(name==="is_free") {
         this.setState({
            [name]: event.target.checked,
         })
      }
      else{
         this.setState({
            [name]: event.target.value,
            [name+"_is_required"]: false
         });
      }
   };

   checkField = (obj) => {
      for (var key in obj) {
            if (obj[key] === ""){
            return key;
            }
      }
      return true;
   }

   handleUploadFile = (event) => {
      let file = event.target.files[0];
      let file_name = file.name;
      this.setState({
         fileURL: URL.createObjectURL(event.target.files[0]),
         fileName: file_name,
         icon: file,
         fileName_is_required: false,
         imgChanged: true,
      })
   }

   onSubmit = () => {
      var data = {
         is_free:this.state.is_free,
         name: this.state.name,
         sub_name:this.state.sub_name,
         product_id: this.state.product_id,
         price: this.state.price,
         currency: this.state.currency,
         photo_count:this.state.photo_count,
         label_count:this.state.label_count,
         description:this.state.description,
      }
      /**check if any field value is null*/ 
      const prop = this.checkField(data);
      
      if(prop === true && this.state.fileName) {
         const id = this.state.id;
         /**update plan.*/
         if(id) {
            console.log(data)
            if(!this.state.imgChanged) {
               axios.patch(requestConfig.baseUrl+"/admin/plans/"+id+"/", data)
               .then((response) => {
                  this.setState({open:true, infor:"Plan updated successfully."}); /**open snackbar*/
                  }
               );
            }
            else {
               data.icon = this.state.icon;
               var options = new FormData();
               for (let key in data) {         
                  options.append(key, data[key]);
               }
               axios.put(requestConfig.baseUrl+"/admin/plans/"+id+"/", options)
               .then((response) => {
                  this.setState({open:true, infor:"Plan updated successfully."}); /**open snackbar*/
                  }
               );
            }
         }
         /**create new plan.*/
         else {
            data.icon = this.state.icon;
            var options = new FormData();
            for (let key in data) {         
               options.append(key, data[key]);
            }
            axios.post(requestConfig.baseUrl+"/admin/plans/", options)
               .then((response) => {
                  this.setState({open:true, infor:"Plan created successfully."}); /**open snackbar*/
               }
            );
         }
      }
      else {
         if(!this.state.fileName) {
            this.setState({
               fileName_is_required : true,
            })
         }
         else {
            this.setState({
               [prop+"_is_required"] : true,
            })
         }
      }
   }

   onClick = () => {
      this.setState({delete: true})
   }

   onDelete = () => {
      const id = this.state.id;
      axios.delete(requestConfig.baseUrl+"/admin/plans/"+id+"/")
         .then((response) => {
            if(response.data ==="")
            {
               this.setState({open:true, infor:"Plan deleted successfully."}); /**open snackbar*/
            }
         }
      );
   }

   render() {
      const {classes} = this.props;
      const infor = this.state.infor;
      const data = this.state;
      return (
      <React.Fragment>
         <FuseAnimateGroup animation="transition.shrinkIn" delay={300} duration={400}>
         {
            this.state.open? 
            /**fire snackbar*/
               <Snackbar open_snack={
                  this.state.open
               } 
                  is_new={infor}
                  data={this.props}
               /> 
               : ""
         }

         <form  noValidate autoComplete="off">
            <Typography variant="h6" gutterBottom>
               {/* Plan */}
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
                           IsFree
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <Checkbox 
                        id="is_free"
                        name="is_free"
                        checked={data.is_free} 
                        onChange={this.handleChange('is_free')}
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
                           Name
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                        id="name"
                        name="name"
                        fullWidth
                        variant="outlined"
                        // placeholder="San Angelo, TX 76904, United States"
                        inputProps={{
                           style: {
                           padding: 10
                           }
                        }}
                        error={this.state.name_is_required}
                        label={this.state.name_is_required? "This field is required": ""}
                        value={data.name}
                        onChange={this.handleChange('name')}
                        InputLabelProps={{
                           style:{
                              marginTop: -9
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
                           Subname
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                        id="Subname"
                        name="sub_name"
                        fullWidth
                        variant="outlined"
                        // placeholder="San Angelo, TX 76904, United States"
                        inputProps={{
                           style: {
                           padding: 10
                           }
                        }}
                        error={this.state.sub_name_is_required}
                        label={this.state.sub_name_is_required? "This field is required": ""}
                        value={data.sub_name}
                        onChange={this.handleChange('sub_name')}
                        InputLabelProps={{
                           style:{
                              marginTop: -9
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
                           Stripe Product Id
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                        fullWidth
                        id="product_id"
                        name="product_id"
                        autoComplete="fname"
                        variant="outlined"
                        inputProps={{
                           style: {
                           padding: 10
                           }
                        }}
                        value={data.product_id}
                        error={this.state.product_id_is_required}
                        label={this.state.product_id_is_required? "This field is required": ""}
                        onChange={this.handleChange("product_id")}
                        InputLabelProps={{
                           style:{
                              marginTop: -9
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
                           Image
                     </Typography>
                  </Grid>
                  <Grid 
                     item 
                     sm={4} 
                     direction={"row"}
                     container
                     justify={"space-between"}
                  >
                     <Grid
                        item
                     >
                        <TextField
                           id="image"
                           name="image"
                           fullWidth
                           autoComplete="fname"
                           variant="outlined"
                           inputProps={{
                              style: {
                              padding: 10
                              }
                           }}
                           error={this.state.fileName_is_required}
                           label={this.state.fileName_is_required? "This field is required": ""}
                           value={data.fileName}
                           InputLabelProps={{
                              style:{
                                 marginTop: -9
                              }
                           }}
                        />
                     </Grid>
                     <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"                        
                        type="file"
                        onChange={
                              this.handleUploadFile
                           }
                     />
                     <label htmlFor="contained-button-file">
                     <Button 
                        variant="contained" 
                        component="span"
                     >
                        Upload
                     </Button>
                     </label>
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
                        Price 
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                        id="price"
                        name="price"
                        onChange={this.handleChange('price')}
                        type="number"
                        variant="outlined"
                        inputProps={{
                           style: {
                           padding: 10
                           }
                        }}
                        error={this.state.price_is_required}
                        label={this.state.price_is_required? "This field is required": ""}
                        value={data.price}
                        InputLabelProps={{
                           style:{
                              marginTop: -9
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
                           Currency
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                        id="currency"
                        name="currency"
                        select
                        value={data.currency}
                        onChange={this.handleChange('currency')}
                        variant="outlined"
                        error={this.state.currency_is_required}
                        label={this.state.currency_is_required? "This field is required": ""}
                        InputLabelProps={{
                           style:{
                              marginTop: -9
                           }
                        }}
                        SelectProps={{
                           style:{
                              width: 217,
                              height:40
                           }
                        }}
                     >
                        {currencies.map(option => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </TextField>
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
                           Photo Count
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                           id="photo_count"
                           name="photo_count"
                           type="number"
                           variant="outlined"
                           inputProps={{
                              style: {
                              padding: 10
                              }
                           }}
                           error={this.state.photo_count_is_required}
                           label={this.state.photo_count_is_required? "This field is required": ""}
                           value={data.photo_count}
                           onChange={this.handleChange('photo_count')}
                           InputLabelProps={{
                              style:{
                                 marginTop: -9
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
                           Label Count
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                        id="outlined-number"
                        name="label_count"
                        type="number"
                        variant="outlined"
                        inputProps={{
                           style: {
                           padding: 10
                           }
                        }}
                        error={this.state.label_count_is_required}
                        label={this.state.label_count_is_required? "This field is required": ""}
                        value={data.label_count}
                        onChange={this.handleChange('label_count')}
                        InputLabelProps={{
                           style:{
                              marginTop: -9
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
                           Description
                     </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                     <TextField
                        multiline
                        rows="4"
                        id="description"
                        name="description"
                        rows="5"
                        fullWidth
                        variant="outlined"
                        // placeholder="San Angelo, TX 76904, United States"
                        inputProps={{
                           style: {
                           padding: 5
                           }
                        }}
                        error={this.state.description_is_required}
                        label={this.state.description_is_required? "This field is required": ""}
                        value={data.description}
                        onChange={this.handleChange('description')}
                        InputLabelProps={{
                           style:{
                              marginTop: -9
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
                     justify={"space-between"}
                  >
                     {
                        this.state.id? (
                           <Button 
                              color="primary" 
                              contained="raised"
                              variant="contained"
                              onClick={this.onClick}
                           >
                              Delete
                           </Button>

                        ):
                        (
                           <div></div>
                        )
                     }
                     <Button 
                        color="secondary" 
                        contained="raised"
                        variant="contained"
                        onClick={this.onSubmit}
                     >
                        Submit
                     </Button>
                  </Grid>
               </Grid> 
            </Grid>
            </form>
         </FuseAnimateGroup>
            <ConfirmDialog is_delete={this.state.delete} parent={this.state} history={this.props} />
      </React.Fragment>
     );
   }; 
}
Plan.propTypes = {
classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(Plan);
export default withStyles(styles, {withTheme: true})(withRouter(Plan));