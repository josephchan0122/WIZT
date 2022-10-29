import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {Icon, Typography} from '@material-ui/core';
// import Form from './Form';
import Form from './Form';
// import Form from './InteractiveGrid';

const styles = theme => ({
    layoutRoot: {}
});

class Setting extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex items-center" style={{marginLeft: 20}}>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">settings</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">Setting</Typography>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <div className="p-24">
                        <Form />
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Setting);