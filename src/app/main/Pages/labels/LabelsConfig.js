import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const LabelsConfig = {
    settings: {
        layout: {
            config: {
                footer:{
                    display: false,
                }
            }
        }
    },
    routes  : [
        {
            path     : '/app/pages/labels',
            component: FuseLoadable({
                loader: () => import('./LabelsApp')
            })
        },
        {
            path     : '/app/pages/labels',
            component: () => <Redirect to="/app/pages/labels"/>
        }
    ]
};
