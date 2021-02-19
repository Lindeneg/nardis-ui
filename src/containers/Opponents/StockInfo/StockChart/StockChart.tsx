import { ChartDataSets } from 'chart.js';

import { opponentInformation, Player, Stocks } from 'nardis-game';

import Chart, { getLabels, normalizeArrayLength } from '../../../../components/Information/Chart/Chart';
import { defaultChartOptions } from '../../../../common/constants';
import { getPlayerIndexFromPlayerId } from '../../Opponents';


interface StockChartProps {
    players: Player[],
    gameStocks: Stocks,
    turn: number
};


const getValues = (
    props: StockChartProps
): ChartDataSets[] => (
    Object.keys(props.gameStocks).map((id: string): ChartDataSets => {
        const index: number = getPlayerIndexFromPlayerId(id, props.players); const player: Player = props.players[index];
        const color: string = opponentInformation[index].color;
        return {
            label: player.name.toUpperCase(),
            backgroundColor: color,
            borderColor: color,
            fill: false,
            spanGaps: true,
            data: normalizeArrayLength(props.turn, props.gameStocks[id].getHistory())
        }
    })
);


const stockChart = (props: StockChartProps): JSX.Element => (
    <Chart 
        id='stockChart'
        type='line'
        data={{labels: getLabels(props.turn), datasets: getValues(props)}}
        options={{
            ...defaultChartOptions
        }}
        style={{width: '100%', height: '500px'}}
    />
);


export default stockChart;