import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {Icon, Typography} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import Plan from "./Plan";
import plans_reducer from "../store/reducer/plans_reducer";

const styles = theme => ({
    layoutRoot: {}
});
class Edit extends Component {

    render()
    {
        const plan_id = this.props.location.state.plan_id;
        const {classes, results} = this.props;
        let plan_data= {};
        for (var i in results) {
            if (results[i].id === plan_id) {
                plan_data = results[i];
            }
        }
        plan_data["id"] = plan_id;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex items-center" style={{marginLeft: 20}}>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">edit</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">EditPlan</Typography>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <div className="p-24">
                        <Plan data={plan_data} history={this.props} />
                    </div>
                }
            />
        )
    }
}

function mapStateToProps({PlansApp}) {
    return { 
        results: PlansApp.results, 
    }
  }
  
export default withReducer('PlansApp', plans_reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(Edit))));