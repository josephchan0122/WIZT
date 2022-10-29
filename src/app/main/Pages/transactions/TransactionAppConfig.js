import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const TransactionAppConfig = {
    settings: {
        layout: {
            config: {
                footer:{
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/app/pages/transactions',
            component: FuseLoadable({
                loader: () => import('./TransactionsApp')
            })
        },
        {
            path     : '/apps/contacts',
            component: () => <Redirect to="/app/pages/transactions"/>
        }
    ]
};
