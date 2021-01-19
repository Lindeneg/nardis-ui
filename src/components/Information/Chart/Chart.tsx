import { Component } from 'react';

import * as ChartJS from 'chart.js';

import Styles from './Chart.module.css';
import { Props } from '../../../common/props';


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


export default Chart;