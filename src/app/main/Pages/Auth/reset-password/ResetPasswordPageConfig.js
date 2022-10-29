import {FuseLoadable} from '@fuse';

export const ResetPasswordPageConfig = {
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
            path     : '/app/pages/auth/reset-password',
            component: FuseLoadable({
                loader: () => import('./ResetPasswordPage')
            })
        }
    ]
};
