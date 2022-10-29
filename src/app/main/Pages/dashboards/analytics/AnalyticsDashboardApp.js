import React, {Component} from 'react';
import {Typography, CardActionArea, CardContent, Paper} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {Chart} from 'react-chartjs-2';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions'
import reducer from './store/reducers';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const classes = {
  Card: {
    color: "#fff",
  },
  media: {
    height: 140,
  },
};
class AnalyticsDashboardApp extends Component {

    constructor(props)
    {
        super(props);

        Chart.pluginService.register({
            afterDatasetsDraw: function (chart, easing) {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                )
                {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i) {
                    const meta = chart.getDatasetMeta(i);

                    if ( !meta.hidden )
                    {

                        meta.data.forEach(function (element, index) {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.54)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }

    componentDidMount()
    {
        this.props.getWidgets();
    }

    onClick = (e) => {
        let route = "";
        const {history} = this.props;
        switch (e) {
            case "users" : 
                route = "/app/pages/users/";
                break;
            case "labels" : 
                route = "/app/pages/labels";
                break;
            case "transactions" : 
                route = "/app/pages/transactions";
                break;
            case "notifications" : 
                route = "/admin/notifications";
                break;
        }
        history.push({
            pathname: route,
        });
    }

    render()
    {
        const {widgets} = this.props;
        const percentage = 66;
        if ( !widgets )
        {
            return 'Loading..';
        }
        return (
            <div className="w-full">

                <Widget1 data={widgets.widget1}/>

                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div className="flex flex-col md:flex-row sm:p-8 container">
                        <div className="flex flex-1 flex-col min-w-0">
                            <div className="flex flex-col sm:flex sm:flex-row pb-32">
                                <div className="widget flex w-full sm:w-1/4 p-16">
                                    <Widget4 data={widgets.widget4} isLoggedIn={false} />
                                </div>
                                <div className="widget flex w-full sm:w-1/4 p-16">
                                    <Widget3 data={widgets.widget3}/>
                                </div>
                                <div className="widget w-full sm:w-1/4 p-16">
                                    <Widget4 data={widgets.widget5} isLoggedIn={true} />
                                </div>
                                <div className="widget w-full sm:w-1/4 p-16">
                                    <Widget2 data={widgets.widget2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </FuseAnimate>
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getWidgets: Actions.getWidgets
    }, dispatch);
}

function mapStateToProps({analyticsDashboardApp})
{
    return {
        widgets: analyticsDashboardApp.widgets.widgets
    }
}

export default withReducer('analyticsDashboardApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboardApp)));
