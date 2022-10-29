import Plans from './Plans';

export const PlansConfig = {
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
            exact    : true,
            path     : '/app/pages/plans',
            component: Plans
        }
    ]
};

/**
 * Lazy load Plans
 */
/*
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const PlansConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/Plans',
            component: FuseLoadable({
                loader: () => import('./Plans')
            })
        }
    ]
};
*/
