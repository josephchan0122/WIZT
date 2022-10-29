const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'dashboard',
                'title': 'Dashboard',
                'type' : 'item',
                'icon' : 'dashboard',
                'url'  : '/app/pages/dashboards'
            },
                        {
                id: "users",
                title: "Users",
                type: "item",
                icon: "people",
                url: "/app/pages/users"
            },
            {
                'id'   : 'labels',
                'title': 'Labels',
                'type' : 'item',
                'icon' : 'format_align_left',
                'url'  : '/app/pages/labels'
            },
            {
                'id'   : 'transactions',
                'title': 'Transactions',
                'type' : 'item',
                'icon' : 'payment',
                'url'  : '/app/pages/transactions'
            },
            {
                'id'   : 'notifications',
                'title': 'Notifications',
                'type' : 'item',
                'icon' : 'notifications',
                'url'  : '/admin/notifications'
            },
            {
                'id'   : 'plans',
                'title': 'Plans',
                'type' : 'item',
                'icon' : 'assessment',
                'url'  : '/app/pages/plans'
            },
            // {
            //     'id'   : 'settings',
            //     'title': 'Settings',
            //     'type' : 'item',
            //     'icon' : 'settings',
            //     'url'  : '/setting'
            // },
        ]
    }
];

export default navigationConfig;

