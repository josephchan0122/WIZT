import Setting from './Setting';

export const SettingConfig = {
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
            exact    : true,
            path     : '/setting',
            component: Setting
        }
    ]
};

