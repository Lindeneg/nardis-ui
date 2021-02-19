import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ChartDataSets} from 'chart.js';

import { Resource } from "nardis-game";

import Button from '../../components/Utility/Button/Button';
import NardisState from "../../common/state";
import { Props } from "../../common/props";
import { GetAllResources } from "../../common/actions";
import { newLineChartInstance, getLabels, normalizeArrayLength } from '../../components/Information/Chart/Chart';
import { ButtonType, defaultChartColors, yieldMap } from '../../common/constants';


interface ResourcesResourceState {
    disabledIds      : string[],
    lowYieldIds      : string[],
    mediumYieldIds   : string[],
    highYieldIds     : string[],
    sortedResources  : Resource[]
};

interface ResourceDataSet {
    id               : string,
    set              : ChartDataSets
};

interface ResourceDataState {
    data             : {
        sets         : ResourceDataSet[],
        labels       : number[]
    }
};

interface ResourcesState extends ResourcesResourceState, ResourceDataState {
    chart            : Chart | null
};

interface ResourcesMappedProps {
    turn             : number,
    getAllResources  : GetAllResources,
};

interface ResourcesProps extends Props, ResourcesMappedProps {}


const mapStateToProps = (state: NardisState): ResourcesMappedProps => ({
    turn           : state.turn,
    getAllResources: state.getAllResources
});

const getValues = (
    turn       : number, 
    resources  : Resource[], 
    disabledIds: string[]
): ResourceDataSet[] => {
    const colors: string[] = [...defaultChartColors];
    return resources.map((resource: Resource): ResourceDataSet => {
        const color: string = colors.pop() || '';
        return {
            id: resource.id,
            set: {
                label: resource.name.toUpperCase(),
                backgroundColor: color,
                borderColor: color,
                fill: false,
                spanGaps: true,
                hidden: disabledIds.filter((id: string): boolean => id === resource.id).length > 0,
                data: normalizeArrayLength(turn, resource.getValueHistory())
            }
        }
    })
}

const getDefaultResourceStateObjects = (resources: Resource[]): ResourcesResourceState  => {
    const lowYieldIds: string[] = []; const mediumYieldIds: string[] = []; const highYieldIds: string[] = []; 
    const sortedResources = resources.sort((a: Resource, b: Resource): number => a.getValue() - b.getValue());
    sortedResources.forEach((resource: Resource): void => {
        const value: number = resource.getValue();
        if (value >= yieldMap.low[0] && value < yieldMap.low[1]) {
            lowYieldIds.push(resource.id);
        } else if (value >= yieldMap.med[0] && value < yieldMap.med[1]) {
            mediumYieldIds.push(resource.id);   
        } else {
            highYieldIds.push(resource.id);
        }
    });
    return {
        sortedResources,
        lowYieldIds,
        mediumYieldIds, 
        highYieldIds,
        disabledIds: [...highYieldIds]
    }
}

const updateDataSets = (datasets: ResourceDataSet[], disabledIds: string[]): ResourceDataSet[] => (
    datasets.map((dataset: ResourceDataSet): ResourceDataSet => ({
        ...dataset,
        set: {
            ...dataset.set,
            hidden: disabledIds.filter((id: string): boolean => id === dataset.id).length > 0
        }
    }))
);

const createChart = (labels: number[], sets: ResourceDataSet[]): Chart => newLineChartInstance(
    'resourcesChart',
    {labels, datasets: sets.map((dataSet: ResourceDataSet): ChartDataSets => dataSet.set)}
);


/**
 * Component to display a chart of Resource values against turns
 */
class Resources extends Component<ResourcesProps, ResourcesState> {
    
    state: ResourcesState = {
        disabledIds: [],
        lowYieldIds: [],
        mediumYieldIds: [],
        highYieldIds: [],
        sortedResources: [],
        data: {
            labels: [],
            sets: []
        },
        chart: null
    };

    componentDidMount = (): void => {
        if (this.state.chart === null) {
            const rrs: ResourcesResourceState = getDefaultResourceStateObjects(this.props.getAllResources());
            const rds: ResourceDataState = {
                data: {
                    labels: getLabels(this.props.turn),
                    sets: getValues(this.props.turn, rrs.sortedResources, rrs.disabledIds)
                }
            };
            this.setState({
                ...this.state,
                ...rrs,
                ...rds, 
                chart: createChart(rds.data.labels, rds.data.sets) 
            });
        }
    }

    onDisabledIdsChange = (disabledIds: string[], createNewChart: boolean = false) => {
        if (this.state.chart) {
            const sets: ResourceDataSet[] = updateDataSets(this.state.data.sets, disabledIds);
            const oldChart: Chart = this.state.chart;
            let chart: Chart;
            if (createNewChart) {
                chart = createChart(this.state.data.labels, sets);
            } else {
                oldChart.data.datasets = sets.map((e: ResourceDataSet): ChartDataSets => e.set);
                oldChart.update();
                chart = oldChart; 
            }
            this.setState({
                ...this.state,
                disabledIds,
                data: {
                    ...this.state.data,
                    sets
                },
                chart
            });
            if (createNewChart) {
                oldChart.destroy();
            }
        }
    }

    render(): JSX.Element {
        const btnProps = {
            disabled: false,
            buttonType: ButtonType.StandardView,
            style: {width: '20%'}
        };
        return (
            <Fragment>
                <Button 
                    {...btnProps}
                    whenClicked={() => this.onDisabledIdsChange([...this.state.lowYieldIds, ...this.state.mediumYieldIds, ...this.state.highYieldIds], true)}
                >
                    DISABLE ALL
                </Button>
                <Button 
                    {...btnProps}
                    whenClicked={() => this.onDisabledIdsChange([...this.state.mediumYieldIds, ...this.state.highYieldIds])}
                >
                    LOW YIELD
                </Button>
                <Button 
                    {...btnProps}
                    whenClicked={() => this.onDisabledIdsChange([...this.state.lowYieldIds, ...this.state.highYieldIds])}
                >
                    MEDIUM YIELD
                </Button>
                <Button 
                    {...btnProps}
                    whenClicked={() => this.onDisabledIdsChange([...this.state.lowYieldIds, ...this.state.mediumYieldIds])}
                >
                    HIGH YIELD
                </Button>
                <Button 
                    {...btnProps}
                    whenClicked={() => this.onDisabledIdsChange([], true)}
                >
                    ENABLE ALL
                </Button>
                <hr/>
                <div style={{width: '100%'}}>
                    <canvas id='resourcesChart' style={{width: '100%', height: '650px'}}></canvas>
                </div>
                <hr/>
            </Fragment>
        );
    }
}


export default connect(mapStateToProps)(Resources);