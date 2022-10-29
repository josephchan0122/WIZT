import * as Actions from '../actions';

const initialState = {
    widgets: {
        widget1: {
            chartType: 'line',
            datasets : {
                'monthly_earning': [
                    {
                        label: 'Sales',
                        data : [3.9, 2.5, 3.8, 4.1, 1.9, 3],
                        fill : 'start'
                    }
                ]
            },
            labels   : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            options  : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                layout             : {
                    padding: {
                        top  : 32,
                        left : 32,
                        right: 32
                    }
                },
                elements           : {
                    point: {
                        radius          : 4,
                        borderWidth     : 2,
                        hoverRadius     : 4,
                        hoverBorderWidth: 2
                    },
                    line : {
                        tension: 0
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            gridLines: {
                                display       : false,
                                drawBorder    : false,
                                tickMarkLength: 18
                            },
                            ticks    : {
                                fontColor: '#ffffff'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks  : {
                                min     : 0,
                                max     : 100,
                                stepSize: 2
                            }
                        }
                    ]
                },
                plugins            : {
                    filler      : {
                        propagate: false
                    },
                    xLabelsOnTop: {
                        active: true
                    }
                }
            }
        },
        widget2: {
            conversion: {
                value   : 492,
                ofTarget: 13
            },
            chartType : 'bar',
            datasets  : [
                {
                    label: 'Earnings',
                    data : []
                }
            ],
            labels    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            options   : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                layout             : {
                    padding: {
                        top   : 24,
                        left  : 16,
                        right : 16,
                        bottom: 16
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks  : {
                                min: 100,
                                max: 500
                            }
                        }
                    ]
                }
            }
        },
        widget3: {
            impressions: {
                value   : '87k',
                ofTarget: 12
            },
            chartType  : 'line',
            datasets   : [
                {
                    label: 'Impression',
                    data : [67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000, 110000, 149000, 98000],
                    fill : false
                }
            ],
            labels     : ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
            options    : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                elements           : {
                    point: {
                        radius          : 2,
                        borderWidth     : 1,
                        hoverRadius     : 2,
                        hoverBorderWidth: 1
                    },
                    line : {
                        tension: 0
                    }
                },
                layout             : {
                    padding: {
                        top   : 24,
                        left  : 16,
                        right : 16,
                        bottom: 16
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks  : {
                                // min: 100,
                                // max: 500
                            }
                        }
                    ]
                }
            }
        },
        widget4: {
            visits   : {
                value   : 882,
                ofTarget: -9
            },
            chartType: 'bar',
            datasets : [
                {
                    label: 'Visits',
                    data : [432, 428, 327, 363, 456, 267, 231]
                }
            ],
            labels   : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            options  : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                layout             : {
                    padding: {
                        top   : 24,
                        left  : 16,
                        right : 16,
                        bottom: 16
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks  : {
                                min: 150,
                                max: 500
                            }
                        }
                    ]
                }
            }
        },
        widget5: {
            visits   : {
                value   : 882,
                ofTarget: -9
            },
            chartType: 'bar',
            datasets : [
                {
                    label: 'Users',
                    data : [432, 428, 327, ]
                }
            ],
            labels   : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            options  : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                layout             : {
                    padding: {
                        top   : 24,
                        left  : 16,
                        right : 16,
                        bottom: 16
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks  : {
                                min: 150,
                                max: 500
                            }
                        }
                    ]
                }
            }
        },
        widget8: {
            datasets: [
                [
                    {
                        label      : '',
                        data       : [],
                        fill       : false,
                        borderColor: '#5c84f1'
                    }
                ],
                [
                    {
                        label      : '',
                        data       : [],
                        fill       : false,
                        borderColor: '#5c84f1'
                    }
                ],
                [
                    {
                        label      : '',
                        data       : [],
                        fill       : false,
                        borderColor: '#5c84f1'
                    }
                ]
            ],
            labels  : ['1', '2', '3', '4', '5', '6', '7'],
            options : {
                spanGaps           : true,
                legend             : {
                    display: false
                },
                maintainAspectRatio: true,
                elements           : {
                    point: {
                        radius          : 2,
                        borderWidth     : 1,
                        hoverRadius     : 2,
                        hoverBorderWidth: 1
                    },
                    line : {
                        tension: 0
                    }
                },
                layout             : {
                    padding: {
                        top   : 24,
                        left  : 16,
                        right : 16,
                        bottom: 16
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            ticks  : {
                                // min: 100,
                                // max: 500
                            }
                        }
                    ]
                }
            },
            today   : '12,540',
            change  : {
                value     : 321,
                percentage: 2.05
            }
        },
    }
};

const widgetsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WIDGETS:
            return {
                    widgets:{
                        widget1 : {
                            ...state.widgets.widget1,
                            ...action.monthlyEarning,
                        },
                        widget2 : {
                            ...state.widgets.widget2,
                            ...action.dailyEarning,
                        },
                        widget3 : {
                            ...state.widgets.widget3,
                            ...action.dailyLabels,
                        },
                        widget4 : {
                            ...state.widgets.widget4,
                            ...action.dailyVisitors,
                        },
                        widget5 : {
                            ...state.widgets.widget5,
                            ...action.dailyLoggedIns,
                        },
                        widget8 : {
                            ...state.widgets.widget8,
                            ...action.sumUp,
                        },
                    }
                };
        default:
            return state;
    }
};

export default widgetsReducer;