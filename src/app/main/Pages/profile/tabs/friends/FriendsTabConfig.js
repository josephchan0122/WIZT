import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const FriendsTabConfig = {
    settings: {
        layout: {
            config: {
            }
        }
    },
    routes  : [
        {
            path     : '/app/pages/profile/tabs/friends',
            exact    : true,
            component: FuseLoadable({
                loader: () => import('./FriendsApp')
            })
        },
        {
            exact    : true,
            path     : '/apps/contacts',
            component: () => <Redirect to="/app/pages/profile/tabs/friends"/>
        }
    ]
};
