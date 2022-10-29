import {FuseLoadable} from '@fuse';
import {authRoles} from 'app/auth';
export const LoginPageConfig = {
    settings: {
        layout: {
            style : 'layout1',
            config: {
                navbar : {
                    display : false, // ture/false
                    folded  : true,
                    position: 'right'
                },
                toolbar: {
                    display : false,
                    style   : 'fixed',
                    position: 'below'
                },
                footer : {
                    display : false, 
                    style   : 'fixed',
                    position: 'below'
                },
                mode   : 'fullwidth',
                settingsPanel: {
                    display: false
                }
            }
        },
        customScrollbars: true,
    },
    auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/app/pages/auth/login',
            component: FuseLoadable({
                loader: () => import('./LoginPage')
            })
        }
    ]
};
