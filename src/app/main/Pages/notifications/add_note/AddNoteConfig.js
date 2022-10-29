import AddNote from './AddNote';

export const AddNoteConfig = {
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
            path     : '/admin/plans/note/',
            component: AddNote
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
