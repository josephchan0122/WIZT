import axios from 'axios';
import requestConfig from "../../../../../config/requestConfig";

export const GET_WIDGETS = '[ANALYTICS DASHBOARD APP] GET WIDGETS';

export function getWidgets()
{   
    const request = axios.post(requestConfig.baseUrl+"/admin/dashboard/");
    return (dispatch) =>
    request.then((response) =>{
        let earning = response.data.earnings.map(a => a.sum);
        let sum = earning.reduce((partial_sum, a) => partial_sum + a,0);
        let year;
        if(response.data.earning) {
            year = response.data.earning[0].year
        } 
        year = null
            dispatch({
                type   : GET_WIDGETS,
                monthlyEarning: {
                    datasets: {
                        'monthly_earning': [
                            {
                                year : year,
                                label: 'Sales',
                                data : earning,
                                fill : 'start'
                            }
                        ]
                    }
                },

                dailyEarning : {
                    conversion : {
                        value   : sum,
                        ofTarget: 13
                    },
                    chartType : 'bar',
                    datasets  : [
                        {
                            label: 'Earnings',
                            data : [221, 428, 492, 471, 413, 344, 294]
                        }
                    ],
                },

                dailyLabels : {
                    impressions: {
                        value   : response.data.label_counts,
                        ofTarget: 12
                    },
                    chartType  : 'line',
                    datasets   : [
                        {
                            label: 'Labels',
                            data : [67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000, 110000, 149000, 98000],
                            fill : false
                        }
                    ],
                },
                dailyVisitors : {
                    visits   : {
                        value   : response.data.users-1,
                        ofTarget: -9
                    },
                    chartType: 'bar',
                    datasets : [
                        {
                            label: 'Visits',
                            data : [432, 428, 327, 363, 456, 267, 231]
                        }
                    ],
                },
                dailyLoggedIns : {
                    visits   : {
                        value   : response.data.image_counts,
                        ofTarget: -9
                    },
                    chartType: 'bar',
                    datasets : [
                        {
                            label: 'LoggedIn',
                            data : [432, 321, 327, 363, 456, 267, 321]
                        }
                    ],
                },
                sumUp : {
                    datasets: [
                        [
                            {
                                Sum        : 12334, 
                                label      : 'earning',
                                data       : [72, 65, 70, 78, 85, 82, 88],
                                fill       : false,
                                borderColor: '#5c84f1',
                                value      : 65
                            }
                        ],
                        [
                            {
                                Sum        : 423234, 
                                label      : 'labels',
                                data       : [540, 539, 527, 548, 540, 552, 566],
                                fill       : false,
                                borderColor: '#5c84f1',
                                value      : 43
                            }
                        ],
                        [
                            {
                                Sum        : 2333, 
                                label      : 'loggedIns',
                                data       : [1520, 1529, 1567, 1588, 1590, 1652, 1622],
                                fill       : false,
                                borderColor: '#5c84f1',
                                value      : -32
                            }
                        ]
                    ],
                },
            })}
        );
}
