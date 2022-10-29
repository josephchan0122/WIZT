import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {Icon, Typography, Button} from '@material-ui/core';
import MediaCard from './cards/MediaCard';
import {getPlans} from "./store/action/plans_action";
import plans_reducer from "./store/reducer/plans_reducer";
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import Plan from "./edit/Plan";


const styles = theme => ({
    layoutRoot: {

    }
});

class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header_content:"",
            body_content:"",
            footer_content:"",
            cards:[
                {
                    index:1,
                    header_content:"Billed Monthly",
                    body_content:"10 Labels",
                    footer_content:"USD 70(Save 45%)",
                },
                {
                    index:2,
                    header_content:"Billed Monthly",
                    body_content:"10 Labels",
                    footer_content:"USD 70(Save 46%)",
                },
                {
                    index:3,
                    header_content:"Billed Monthly",
                    body_content:"10 Labels",
                    footer_content:"USD 70(Save 47%)",
                },
            ],
            add_plan: true,
        }
    }

    componentDidMount() {
        this.props.getPlans();
    }

    add_plan = () => {
        const {history} = this.props; 
        history.push({
            pathname: "/admin/plans/add/",
        })
    }

    render()
    {
        const plans = this.props.results;
        const {classes} = this.props;
        const {open_snack, infor} = this.props.location;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    this.state.add_plan? (
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-center" style={{marginLeft: 20}}>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Icon className="text-32 mr-12">assessment</Icon>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography variant="h6" className="hidden sm:flex">Plans</Typography>
                                </FuseAnimate>
                            </div>
                            <div style={{marginRight: 20}}>
                                <Button 
                                    onClick={
                                        (ev) => {
                                            ev.preventDefault();
                                            this.add_plan()
                                        }
                                    }
                                >
                                    <Icon>
                                        add_circle
                                    </Icon>
                                    <Typography style={{marginLeft:4}}>new</Typography>
                                </Button>
                            </div>
                        </div>

                    ) : (
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-center" style={{marginLeft: 20}}>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Icon className="text-32 mr-12">add_box</Icon>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography variant="h6" className="hidden sm:flex">Add Plan</Typography>
                                </FuseAnimate>
                            </div>
                        </div>
                    )
                }
                content={
                    <div className="p-24">
                    {
                        this.state.add_plan? (
                            <div style={{display:"flex", flexFlow: "row wrap", justifyContent:"space-evenly"}}>
                                { plans.map((data, index) => (
                                    <MediaCard 
                                        key={index}
                                        id={data.id}
                                        title={data.name}
                                        sub_name={data.sub_name} 
                                        currency={data.currency} 
                                        description={data.description} 
                                        imageURL={data.icon}
                                        history={this.props.history}
                                    />
                                ))}
                            </div>
                        ) : (<Plan />) 
                    }
                    </div>
                }
            />
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getPlans  : getPlans,
    }, dispatch);
}

function mapStateToProps({PlansApp})
{
    return {
        results  : PlansApp.results,
    }
}

export default withReducer('PlansApp', plans_reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Example))));

