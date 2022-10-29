import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const FloorPlansTabConfig = {
    settings: {
        layout: {
            config: {
            }
        }
    },
    routes  : [
        {
            path     : '/app/pages/profile/tabs/floorplans',
            exact    : true,
            component: FuseLoadable({
                loader: () => import('./FloorPlansApp')
            })
        },
        {
            exact    : true,
            path     : '/apps/contacts',
            component: () => <Redirect to="/app/pages/profile/tabs/floorplans"/>
        }
    ]
};
