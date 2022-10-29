import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {Icon, Typography} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import Plan from "../edit/Plan";
import plans_reducer from "../store/reducer/plans_reducer";

const styles = theme => ({
    layoutRoot: {}
});

class AddPlan extends Component {

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
                            <Typography variant="h6" className="hidden sm:flex">AddPlan</Typography>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <div className="p-24">
                        <Plan data={{icon: null}}/>
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
  
export default withReducer('PlansApp', plans_reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(AddPlan))));