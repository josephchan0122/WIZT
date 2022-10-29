import React, {Component} from 'react';
import {withStyles, Card, CardContent, Divider, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';
import JWTLoginTab from './tabs/JWTLoginTab';
import _ from '@lodash';

const styles = theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText

    }
});

class LoginPage extends Component {

    state = {
        email   : '',
        password: '',
        remember: true
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className="w-full max-w-384">

                            <CardContent className="flex flex-col items-center justify-center p-32 pb-56">

                                <img className="w-128 m-32" src="assets/images/logos/logo.svg" alt="logo"/>

                                <Typography variant="h6" className="mt-16 mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                                    <JWTLoginTab/>

                                <div className="my-24 flex items-center justify-center">
                                    {/* <Divider className="w-32"/> */}
                                    {/* <span className="mx-8 font-bold">OR</span> */}
                                    {/* <Divider className="w-32"/> */}
                                </div>
                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(LoginPage);
