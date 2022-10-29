import AddPlan from './AddPlan';

export const AddPlanConfig = {
    settings: {
        layout: {
            config: {
                footer: {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/admin/plans/add/',
            component: AddPlan
        }
    ]
};

/**
 * Lazy load Example
 */
/*
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: FuseLoadable({
                loader: () => import('./Example')
            })
        }
    ]
};
*/
