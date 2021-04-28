import { Fragment } from "react";
import { connect } from "react-redux";
import { ChartData } from "chart.js";
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

import { 
    FinanceHistory, 
    FinanceHistoryItem, 
    FinanceTurnItem,
    FinanceTotal, 
    FinanceType,
    Resource, 
    localKeys, 
    isDefined,
} from "nardis-game";

import Chart from '../../components/Information/Chart/Chart';
import Table from '../../components/Utility/Table/Table';
import NardisState from "../../common/state";
import Styles from './Finance.module.css';
import { defaultChartColors, FinanceExpenseRows } from "../../common/constants";
import { Func, Functional, MapState, Props } from "../../common/props";
import { 
    GetAllResources, GetFinanceHistory, 
    GetFinanceTotal, GetTotalProfits 
} from "../../common/actions";


type Compare = Func<FinanceTurnItem, boolean>;

interface FinanceTotalIdName {
    id               : string,
    name             : string
};

interface FinanceMappedProps {
    turn             : number,
    startGold        : number,
    getFinanceHistory: GetFinanceHistory,
    getAllResources  : GetAllResources,
    getFinanceTotal  : GetFinanceTotal
    getTotalProfits  : GetTotalProfits
};

interface FinanceProps extends Props, FinanceMappedProps {
    alt             ?: {
        history      : FinanceHistory,
        total        : FinanceTotal,
        totalProfits : number

    }
};


const mapStateToProps: MapState<FinanceMappedProps> = (state: NardisState): FinanceMappedProps => ({
    turn             : state.turn,
    startGold        : state.startGold,
    getFinanceHistory: state.getFinanceHistory,
    getAllResources  : state.getAllResources,
    getFinanceTotal  : state.getFinanceTotal,
    getTotalProfits  : state.getTotalProfits
});

const getHeaders = (currentTurn: number, start: string): string[] => [
    start,
    'TURN ' + currentTurn,
    'TURN ' + (currentTurn > 1 ? currentTurn - 1 : '~'),
    'TURN ' + (currentTurn > 2 ? currentTurn - 2 : '~'),
    'ALL TURNS'
];

const reduceFinance = (items: FinanceTurnItem[], cmp?: Compare): number => (
    (cmp ? items.filter((e: FinanceTurnItem): boolean => cmp(e)) : items)
    .map((e: FinanceTurnItem): number => e.amount * e.value)
    .reduce((a: number, b: number) => a + b, 0)
);

const getRow = (item: FinanceHistoryItem, cmp: Compare): string[] => (
    Object.keys(item)
    .map((e: string): string => (reduceFinance(item[e], cmp).toLocaleString() + 'G'))
);

const getTotalProfitsPerTurn = (history: FinanceHistory) => (
    Object.keys(history.income).map(key => (
        (reduceFinance(history.income[key]) - reduceFinance(history.expense[key])).toLocaleString() + 'G'
    ))
);

const getDistributionEntries = (resources?: Resource[]): FinanceTotalIdName[] => {
    if (typeof resources !== 'undefined') {
        return [
            ...resources.map((e: Resource): FinanceTotalIdName => ({id: e.id, name: e.name})), 
            {id: localKeys[FinanceType.Recoup], name: 'RECOUP'}, 
            {id: localKeys[FinanceType.StockSell], name: 'STOCKS'}
        ];
    } else {
        return [
            ...FinanceExpenseRows.map((row: [string, FinanceType]): FinanceTotalIdName => ({
                id: localKeys[row[1]],
                name: row[0]
            })),
            {id: localKeys[FinanceType.StockBuy], name: 'STOCKS'}
        ];
    }
}

const getDistribution = (total: FinanceTotal, resources?: Resource[]): ChartData | null => {
    const data: Array<[string, number]> = getDistributionEntries(resources)
    .map((item: FinanceTotalIdName): [string, number] => (isDefined(total[item.id]) ? [item.name, total[item.id]] : ['', 0]))
    .filter((tuple: [string, number]): boolean => tuple[0].length > 0 && tuple[1] > 0);
    if (data.length > 0) {
        const colors: string[] = [...defaultChartColors];
        return {
            labels: data.map(e => e[0].toUpperCase()).reverse(),
            datasets: [{data: [...data.map(e => e[1])].reverse(), backgroundColor: colors, borderColor: '#ccc'}]
        }
    }
    return null;
}

const getDistributionChart = (total: FinanceTotal, resources?: Resource[]): JSX.Element | null => {
    const isRevenue: boolean = typeof resources !== 'undefined';
    const distribution: ChartData | null = getDistribution(total, resources);
    if (distribution !== null) {
        return (
            <Chart 
                type='pie'
                id={isRevenue ? 'revenueChart' : 'expenseChart'}
                data={{
                    ...distribution
                }}
                plugins={[ChartDataLabels]}
                options={{
                    title: {text: (isRevenue ? 'REVENUE' : 'EXPENSE') + ' DISTRIBUTION', display: true, fontColor: 'white'},
                    legend: {labels: {fontColor: 'white'}},
                    responsive: true,
                    plugins: {datalabels: {formatter: (val, ctx) => {
                        if (ctx.dataset.data) {
                            //@ts-expect-error
                            return (val / ctx.dataset.data.reduce((a: number, b: number): number => a + b, 0) * 100).toFixed(2) + '%';
                        }
                        return '';
                    }, color: '#ccc', backgroundColor: 'navy', font: {size: 15}, anchor: 'end', align: 'start', display: (context: Context): boolean => context.active}}
                }}  
                style={{width: '100%', height: '600px'}}
            />
        );
    }
    return null;
}


// perhaps create css classes in the table component and simply pass the desired class-name as a prop

const propStyles = {
    rowStyles: {
        maxWidth: '0px',
        paddingTop: '12px',
        fontSize: '14px',
        color: '#eee'
    },
    headerStyles: {
        color: 'burlywood', 
        fontSize: '18px'
    },
    headerStylesAfter: {
        color: '#212fa2', 
        fontSize: '18px'
    }
};


/**
 * Component to display financial information from the current 
 * and last two turns as well as the overall total for all turns.
 */
const finance: Functional<FinanceProps> = (
    props: FinanceProps
): JSX.Element => {
    const history    : FinanceHistory = props.alt ? props.alt.history : props.getFinanceHistory()[0];
    const total      : FinanceTotal   = props.alt ? props.alt.total : props.getFinanceTotal()[0];
    const revenueRows: Resource[]     = props.getAllResources();

    const mGetHeaders                 = getHeaders.bind(null, props.turn);
    const mGetRow                     = getRow.bind(null, history.expense);
    const mCmp                        = (target: FinanceType, item: FinanceTurnItem): boolean => item.type === target;  
    const mGetTotal                   = (key: string | number)                      : string  => (
        (total[(typeof key === 'number' ? localKeys[key] : key)] || 0).toLocaleString() + 'G'
    );
    return (
        <Fragment>
            <hr/>
            {typeof props.alt === 'undefined' ? 
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {getDistributionChart(total, revenueRows)}
                    {getDistributionChart(total)}
                </div> 
            : null}
            <div className={Styles.Finance}>
                <hr/>
                <div className={Styles.Tables}>
                    <div className={Styles.FinanceTable}>
                        <Table
                            headers={mGetHeaders('REVENUE')}
                            rows={[
                                ...revenueRows.map((e: Resource): string[] => ([
                                    e.name, 
                                    ...getRow(history.income, (j: FinanceTurnItem): boolean => e.id === j.id), 
                                    mGetTotal(e.id)
                                ])),
                                [
                                    'RECOUPS',
                                    ...getRow(history.income, (j: FinanceTurnItem): boolean => j.id === localKeys[FinanceType.Recoup]),
                                    mGetTotal(localKeys[FinanceType.Recoup])
                                ],
                                [
                                    'STOCKS',
                                    ...getRow(history.income, (j: FinanceTurnItem): boolean => j.id === localKeys[FinanceType.StockSell]),
                                    mGetTotal(localKeys[FinanceType.StockSell])
                                ]
                            
                            ]}
                            rowStyles={propStyles.rowStyles}
                            headerStyles={propStyles.headerStyles}
                        />
                    </div>
                    <hr/>
                    <div className={Styles.FinanceTable} >
                        <Table
                            headers={mGetHeaders('EXPENSE')}
                            rows={[
                                ...FinanceExpenseRows.map((row: [string, FinanceType]): string[] => [
                                    row[0],
                                    ...mGetRow(mCmp.bind(null, row[1])),
                                    mGetTotal(row[1])
                                    ]
                                ),
                                [
                                    'STOCKS',
                                    ...getRow(history.expense, (j: FinanceTurnItem): boolean => j.id === localKeys[FinanceType.StockBuy]),
                                    mGetTotal(localKeys[FinanceType.StockBuy])
                                ]
                            ]}
                            {...propStyles}
                        />
                    </div>
                    <hr/>
                    <div className={Styles.FinanceTable}>
                        <Table
                            headers={mGetHeaders('PROFITS')}
                            rows={[
                                ['TOTAL PROFITS', ...getTotalProfitsPerTurn(history), ((props.alt ? props.alt.totalProfits : props.getTotalProfits()) - props.startGold).toLocaleString() + 'G']
                            ]}
                            {...propStyles}
                        />
                    </div>
                    <hr/>
                </div>
            </div>
            <hr/>
        </Fragment>
    );
}


export default connect(mapStateToProps)(finance);