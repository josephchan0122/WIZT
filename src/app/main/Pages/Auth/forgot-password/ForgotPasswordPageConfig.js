import {FuseLoadable} from '@fuse';

export const ForgotPasswordPageConfig = {
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
                rightSidePanel: {
                    display: false
                }
            }
        },
        customScrollbars: false,
    },
    routes  : [
        {
            path     : '/app/pages/auth/forgot-password',
            component: FuseLoadable({
                loader: () => import('./ForgotPasswordPage')
            })
        }
    ]
};
