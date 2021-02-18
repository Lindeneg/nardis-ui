import { Component } from 'react';

import * as ChartJS from 'chart.js';

import Styles from './Chart.module.css';
import { Props } from '../../../common/props';
import { ValueHistory } from 'nardis-game';


interface ChartProps extends Props, ChartJS.ChartConfiguration {
    id?: string
}

/**
 * Chart component using Chart.js
 */
class Chart extends Component<ChartProps> {

    componentDidMount = (): void => {
        new ChartJS.Chart(
            this.props.id || 'someChart',
            {...this.props}
        )
    }

    render () {
        return (
            <div className={Styles.Chart}>
                <canvas id={this.props.id || 'someChart'} style={this.props.style}></canvas>
            </div>
        )
    }
}


export const getLabels = (turn: number): number[] => {
    const arr: number[] = [];
    for (let i = 1; i < turn + 1; i++) {
        arr.push(i);
    }
    return arr;
}

export const normalizeArrayLength = (currentTurn: number, history: ValueHistory[]): Array<number | null> => {
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


export default Chart;