import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';
import {authRoles} from 'app/auth';

export const UsersAppConfig = {
    settings: {
        layout: {
            config: {
                footer:{
                    display: false,
                }
            }
        }
    },
    // auth    : authRoles.admin,
    routes  : [
        {
            exact    : true,
            path     : '/app/pages/users',
            component: FuseLoadable({
                loader: () => import('./UsersApp')
            })
        },
        {
            path     : '/app/users',
            component: () => <Redirect to="/app/pages/users"/>
        }
    ]
};
