import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const NotificationsAppConfig = {
    settings: {
        layout: {
            config: {
                footer: {
                    display : false,
                }
            }
        }
    },
    routes  : [
        {
            path     : '/admin/notifications',
            component: FuseLoadable({
                loader: () => import('./NotificationsApp')
            })
        },
        {
            path     : '/apps/contacts',
            component: () => <Redirect to="/apps/contacts/all"/>
        }
    ]
};
