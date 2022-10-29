import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const LabelsTabConfig = {
    settings: {
        layout: {
            config: {
            }
        }
    },
    routes  : [
        {
            path     : '/app/pages/profile/tabs/labels',
            exact    : true,
            component: FuseLoadable({
                loader: () => import('./LabelsApp')
            })
        },
        {
            exact    : true,
            path     : '/apps/contacts',
            component: () => <Redirect to="/app/pages/profile/tabs/labels"/>
        }
    ]
};
