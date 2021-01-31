import { Fragment } from "react";
import { connect } from "react-redux";

import { ChartDataSets } from 'chart.js';

import { Resource, ResourceValueHistory } from "nardis-game";

import NardisState from "../../common/state";
import Chart from '../../components/Information/Chart/Chart';
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


// generate array containing number from 1 to the current turn number
const getLabels = (turn: number): number[] => {
    const arr: number[] = [];
    for (let i = 1; i < turn + 1; i++) {
        arr.push(i);
    }
    return arr;
}


/* history length will always be less than currentTurn  
   so normalize array length to the value of currentTurn */
const normalizeArrayLength = (currentTurn: number, history: ResourceValueHistory[]): Array<number | null> => {
    const arr: Array<number | null> = [];
    for (let i = 0; i < history.length; i++) {
        const notLastEntry: boolean = i < history.length - 1;
        const [turn, value]: [number, number] = [history[i].turn, history[i].value];
        const diff: number = notLastEntry ? history[i + 1].turn - turn : (currentTurn - turn) + 1;
        for (let j = 0; j < diff; j++) {
            arr.push(j <= 0 || (!notLastEntry && j === diff - 1) ? value : null);
        }
    }
    return arr;
}

// generate array of ChartDataSets from Resource instances
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
        <h1 style={{color: 'white', textAlign: 'center'}}>RESOURCE VALUES OVER TIME</h1>
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