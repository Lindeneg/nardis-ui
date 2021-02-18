import { Fragment } from "react";
import { connect } from "react-redux";

import { ChartDataSets } from 'chart.js';

import { Resource } from "nardis-game";

import NardisState from "../../common/state";
import Chart, { getLabels, normalizeArrayLength } from '../../components/Information/Chart/Chart';
import { Functional, Props } from "../../common/props";
import { GetAllResources } from "../../common/actions";
import { defaultChartColors } from '../../common/constants';


interface ResourcesMappedProps {
    turn             : number,
    getAllResources  : GetAllResources,
};

interface ResourcesProps extends Props, ResourcesMappedProps {}


const mapStateToProps = (state: NardisState): ResourcesMappedProps => ({
    turn             : state.turn,
    getAllResources  : state.getAllResources
});


const getValues = (turn: number, resources: Resource[]): ChartDataSets[] => {
    const colors: string[] = [...defaultChartColors];
    return resources.map((resource: Resource): ChartDataSets => {
        const color: string = colors.pop() || '';
        return {
            label: resource.name.toUpperCase(),
            backgroundColor: color,
            borderColor: color,
            fill: false,
            spanGaps: true,
            data: normalizeArrayLength(turn, resource.getValueHistory())
        }
    })
}


/**
 * Component to display a chart of Resource values against turns
 */
const resources: Functional<ResourcesProps> = (
    props: ResourcesProps
): JSX.Element => (
    <Fragment>
        <hr/>
        <Chart
            id='resourceChart'
            type='line'
            data={{
                labels: getLabels(props.turn),
                datasets: getValues(props.turn, props.getAllResources())
            }}
            options={{
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                },
                elements: {
                    point: {
                        radius: 2
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'TURN',
                            fontColor: '#eee'
                        },
                        ticks: {
                            fontColor: 'white',
                            autoSkip: true,
                            maxTicksLimit: 15
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'VALUE',
                            fontColor: '#eee'
                        },
                        ticks: {
                            fontColor: 'white'
                        }
                    }]
                },
                responsive: true
            }}
            style={{
                width: '100%',
                height: '650px'
            }}
        />
    </Fragment>
);


export default connect(mapStateToProps)(resources);