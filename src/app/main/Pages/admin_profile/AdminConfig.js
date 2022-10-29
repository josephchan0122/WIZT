import Admin from './Admin';

export const AdminConfig = {
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
            path     : '/admin',
            component: Admin
        }
    ]
};

