import React from 'react';
import {withStyles, Card, Icon, Typography} from '@material-ui/core';

const Widget4 = ({data, theme, isLoggedIn}) => {

    data.datasets.map(obj => ({
        ...obj,
        borderColor    : theme.palette.error.main,
        backgroundColor: theme.palette.error.main
    }));

    return (
        <Card className="w-full rounded-8 shadow-none border-1">

            <div className="p-16 flex flex-row items-end flex-wrap">

                <div className="w-full">
                    <Typography className="h3" color="textSecondary">
                        {isLoggedIn? "Images" : "Users" }
                   </Typography>
                    <Typography className="text-64 font-300 leading-none mt-8" align="center">
                        {data.visits.value}
                    </Typography>
                </div>

                {/* <div className="py-4 text-16 flex flex-row items-center">
                    <div className="flex flex-row items-center">
                        {data.visits.ofTarget > 0 && (
                            <Icon className="text-green mr-4">trending_up</Icon>
                        )}
                        {data.visits.ofTarget < 0 && (
                            <Icon className="text-red mr-4">trending_down</Icon>
                        )}
                        <Typography>{data.visits.ofTarget}%</Typography>
                    </div>
                    <Typography className="ml-4 whitespace-no-wrap">of target</Typography>
                </div> */}

            </div>
        </Card>
    );
};

export default withStyles(null, {withTheme: true})(Widget4);
