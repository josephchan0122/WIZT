import {FuseLoadable} from '@fuse';

export const AnalyticsDashboardAppConfig = {
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
            path     : '/app/pages/dashboards',
            exact    : true,
            component: FuseLoadable({
                loader: () => import('./AnalyticsDashboardApp')
            })
        }
    ]
};
